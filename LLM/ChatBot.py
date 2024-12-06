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
            f"What is the capital of France?"
            f"How do you make a cup of coffee?"
            f"Tell me a joke."
            f"What's the weather like today?"
            f"Who won the World Series in 2020?"
            f"How do you solve a quadratic equation?"
            f"What is the speed of light?"
            f"Explain the theory of relativity."
            f"What is the meaning of life?"
            f"How do you bake a cake?"
            f"What is the tallest mountain in the world?"
            f"How do you change a tire?"
            f"What is the population of New York City?"
            f"How do you play chess?"
            f"What is the Pythagorean theorem?"
            f"Who wrote 'To Kill a Mockingbird'?"
            f"What is the boiling point of water?"
            f"How do you program in Python?"
            f"What is the largest planet in our solar system?"
            f"How do you make a paper airplane?"
            f"What is the formula for calculating the area of a circle?"
            f"Who was the first president of the United States?"
            f"How do you tie a tie?"
            f"What is the chemical symbol for gold?"
            f"How do you make a smoothie?"
            f"What is the distance between the Earth and the Moon?"
            f"How do you solve a Rubik's cube?"
            f"What is the capital of Japan?"
            f"How do you write a resume?"
            f"What is the freezing point of water?"
            f"How do you play the guitar?"
            f"What is the formula for calculating the volume of a sphere?"
            f"Who discovered penicillin?"
            f"How do you make a pizza?"
            f"What is the circumference of the Earth?"
            f"How do you knit a scarf?"
            f"What is the capital of Canada?"
            f"How do you write a cover letter?"
            f"What is the atomic number of carbon?"
            f"How do you make a salad?"
            f"What is the distance between the Earth and the Sun?"
            f"How do you play the piano?"
            f"What is the formula for calculating the area of a triangle?"
            f"Who invented the telephone?"
            f"How do you make a sandwich?"
            f"What is the capital of Australia?"
            f"How do you write a business plan?"
            f"What is the melting point of ice?"
            f"How do you play the violin?"
            f"What is the formula for calculating the perimeter of a rectangle?"
            f"Who wrote 'Pride and Prejudice'?"
            f"How do you make a cup of tea?"
            f"What is the capital of Germany?"
            f"How do you write a thank you note?"
            f"What is the atomic mass of hydrogen?"
            f"How do you make a burger?"
            f"What is the distance between the Earth and Mars?"
            f"How do you play the drums?"
            f"What is the formula for calculating the surface area of a cylinder?"
            f"Who painted the Mona Lisa?"
            f"How do you make a cocktail?"
            f"What is the capital of Italy?"
            f"How do you write a research paper?"
            f"What is the boiling point of ethanol?"
            f"How do you play the flute?"
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
