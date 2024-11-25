from transformers import T5Tokenizer, T5ForConditionalGeneration


class DrYangChatBot:
    # Initialize the chatbot with flan-t5-base model
    def __init__(self, model_name="google/flan-t5-base"):
        print("Loading Model. Please be patient, this may take a while...")
        # Load tokenizer with legacy behavior disabled
        self.tokenizer = T5Tokenizer.from_pretrained(model_name, legacy=False)
        # Load the pre-trained model
        self.model = T5ForConditionalGeneration.from_pretrained(model_name)
        # Create an empty array to store conversation history
        self.conversation_history = []

    # Define a method to get a response
    def get_response(self, user_input):
        # Add user input to the conversation history
        self.conversation_history.append({"role": "user", "content": user_input})

        # Limit context to the last 2 exchanges
        context = " ".join([msg["content"] for msg in self.conversation_history[-2:]])
        input_text = f"The following is a conversation with an intelligent and helpful chatbot:\n{context}\nUser: {user_input}\nChatbot:"

        # Tokenize input with attention mask
        inputs = self.tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)
        input_ids = inputs.input_ids
        attention_mask = inputs.attention_mask

        # Generate a response from the model
        outputs = self.model.generate(
            input_ids,
            attention_mask=attention_mask,  # Pass attention mask to avoid warnings
            max_length=100,
            num_beams=5,
            pad_token_id=self.tokenizer.eos_token_id
        )

        # Decode the generated output into readable text
        bot_response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Add the bot's response to the conversation history
        self.conversation_history.append({"role": "bot", "content": bot_response})

        # Return the response so it can be displayed to the user
        return bot_response

    def save_conversation(self, filename="conversation.json"):
        # Import the JSON module for saving data
        import json
        # Save conversation history into a JSON file for future reference
        with open(filename, "w") as json_file:
            json.dump(self.conversation_history, json_file, indent=4)


if __name__ == "__main__":
    # Initialize the chatbot
    drYangChatBot = DrYangChatBot()
    print("DRYangGPT is ready! Type 'exit' to end the conversation.")

    # Loop to handle user input
    while True:
        print("Waiting for user input...")  # Debug message
        user_input = input("You: ").strip()  # Handles accidental spaces or newlines
        # Create an if statement for when the user wants to leave
        if user_input.lower() == 'exit':
            drYangChatBot.save_conversation()  # Save history to JSON
            print("Conversation saved to 'conversation.json'. Bye for Now!")
            break
        response = drYangChatBot.get_response(user_input)
        # Print the response
        print(f"Bot: {response}")


         
