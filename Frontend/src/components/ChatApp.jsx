import React, { useState } from 'react';
import './ChatApp.css';
import TextBubble from './TextBubble';  // Import the TextBubble component

const ChatApp = ({ chat }) => {
  const [message, setMessage] = useState('');
 
 
  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      chat.messages.push({ text: message, who: 'User' });  // Add the user's message with 'User' label
      setMessage('');  // Reset the input field after sending the message
    }
  };


  return (
    <div className="chatApp">
      <div className="chatHeader">
        <h2>{chat.name}</h2>
      </div>

      {/* Displaying messages */}
      <div className="messageList">
        {chat.messages.map((msg, index) => (
          <div key={index} className="message">
            {/* Use the TextBubble component for displaying the message */}
            <TextBubble text={msg.text} who={msg.who} />
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="messageInput">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;