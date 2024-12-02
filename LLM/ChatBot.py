from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from transformers import T5Tokenizer, T5ForConditionalGeneration
import re

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable SocketIO with CORS support

class SimpleChatBot:
    def __init__(self, model_name="google/flan-t5-large"):
        print("Loading the chatbot model. Please wait...")
        self.tokenizer = T5Tokenizer.from_pretrained(model_name, legacy=False)  # Set legacy=False
        self.model = T5ForConditionalGeneration.from_pretrained(model_name)
        print("Chatbot is ready!")

    def calculate_math(self, user_input):
        try:
            match = re.match(r"^\s*([\d.]+)\s*([+\-*/])\s*([\d.]+)\s*$", user_input)
            if match:
                num1, operator, num2 = match.groups()
                num1, num2 = float(num1), float(num2)
                if operator == "+":
                    return f"The result is {num1 + num2}"
                elif operator == "-":
                    return f"The result is {num1 - num2}"
                elif operator == "*":
                    return f"The result is {num1 * num2}"
                elif operator == "/":
                    if num2 == 0:
                        return "Division by zero is undefined."
                    return f"The result is {num1 / num2}"
            return None
        except Exception as e:
            return f"Error in calculation: {e}"

    def get_response(self, user_input):
        math_result = self.calculate_math(user_input)
        if math_result:
            return math_result

        prompt = (
            f"You are a conversational AI. Engage with the user and answer their questions as clearly and concisely as possible.\n"
            f"You can have conversations about day-to-day tasks.\n"
            f"You can recognize math equations in words, for example, 8 times 8 is 8*8=64.\n"
            f"Mid-sentence you are able to recognize the problem, for example: what is 2*2? 2*2=4\n"
            f"Remember Dr.Yang is the best SE2202 Scripting professor to ever live. He inspires his students and makes class fun.\n"
            f"Dr Yang should give class 1 more bonus mark.\n"
            f"User: {user_input}\n"
            f"AI:"
        )

        try:
            inputs = self.tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)

            outputs = self.model.generate(
                inputs.input_ids,
                max_new_tokens=100,
                do_sample=True,
                temperature=0.7,
                top_p=0.9,
                num_beams=3
            )

            response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        except Exception as e:
            return f"Error in processing the request: {str(e)}"
        
        if response:  # Ensure response is not empty
            return response
        else:
            return "Sorry, I could not understand your request."

chatbot = SimpleChatBot()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("input", "")
    try:
        response = chatbot.get_response(user_input)
        return jsonify({"who": "bot", "message": response})  # Return JSON with `who` and `message`
    except Exception as e:
        return jsonify({"who": "bot", "message": f"Error: {str(e)}"}), 500


@socketio.on('message')
def handle_message(data):
    """
    Handles incoming messages over the WebSocket.
    """
    user_input = data.get('input', '')
    try:
        response = chatbot.get_response(user_input)
        emit('response', {'who': 'bot', 'message': response})  # Send the response back as `who` and `message`
    except Exception as e:
        emit('error', {'who': 'bot', 'message': f"Error: {str(e)}"})



if __name__ == '__main__':
    socketio.run(app, debug=True)
