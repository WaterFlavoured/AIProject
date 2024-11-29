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
      console.log(chat);
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
          <div key={index} className={msg.who === 'DrYangGPT' ? 'textBubbleLeft' : 'textBubbleRight'}>
            {/* Use the TextBubble component for displaying the message */}
            <TextBubble text={msg.text} who={msg.who} />
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form className="messageInput" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;