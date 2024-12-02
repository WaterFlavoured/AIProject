import React, { useState } from 'react';
import './ChatApp.css';
import TextBubble from './TextBubble';  // Import the TextBubble component

const ChatApp = ({ chat }) => {
  const [message, setMessage] = useState(''); // Initializing message with empty string

 
  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (message.trim() !== '') { // If the message isn't just white space
      const newMessage = {
        id: chat.length + 1, // Assigning message id
        who: 'User', // Indicating the message input was from user
        text: message, // Taking input text as message
      };
      chat.push(newMessage); // Adding the user message to the chat array
      setMessage(''); // Clearing input
    }
  };


  return (
    <div className="chatApp">
      {/* Displaying messages */}
      <div className="messageList">
        {/* Looping through messages in chat array to render each message */}
        {chat.map((msg) => (
          <div key={msg.id} className="message">
            {/* Use the TextBubble component for displaying the message */}
            <TextBubble text={msg.text} who={msg.who} className={msg.who === "User" ? "textBubbleRight" : "textBubbleLeft"}/>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form className="messageInput" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
        {/* Creating user message (input) submission form */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        {/* Button for sending the input */}
        <button type="submit">Send</button> 
      </form>
    </div>
  );
};

export default ChatApp; 