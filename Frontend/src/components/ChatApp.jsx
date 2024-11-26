import React, { useState } from 'react';
import './ChatApp.css';

const ChatApp = ({ chat }) => {
  const [message, setMessage] = useState('');

  // Function to handle sending a new message (you'll need to handle this in your state)
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      chat.messages.push(message);  // You may want to manage state properly here
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
            {msg}
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