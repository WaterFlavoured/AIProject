import React, { useState, useEffect } from 'react';
import './ChatApp.css';
import TextBubble from './TextBubble';
import { io } from 'socket.io-client';
const socket = io('http://127.0.0.1:5000');
const ChatApp = ({ chat, onSendMessage }) => {
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for messages from the server
    socket.on('response', (data) => {
      onSendMessage(data.message, 'DrYangGPT');
      console.log(data.message);
    });

    // Handle errors
    socket.on('error', (data) => {
      onSendMessage(data.message, 'DrYangGPT');
    });

    return () => {
      socket.off('response');
      socket.off('error');
    };
  }, [onSendMessage]); // This ensures that the effect runs only once

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // Send the message to the server via WebSocket
      socket.emit('message', { input: message });// Ensure this emits the message when Send is clicked
      onSendMessage(message, 'User'); // Pass the new message to MainPage
      setMessage(''); // Clear input after message is sent
    }
  };

  return (
    <div className="chatApp">
      <div className="messageList">
        {chat.map((msg) => (
          <div key={msg.id} className="message">
            <TextBubble
              text={msg.text}
              who={msg.who}
              className={msg.who === 'User' ? 'textBubbleRight' : 'textBubbleLeft'}
            />
          </div>
        ))}
      </div>

      <form
        className="messageInput"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(); // Call send message only when form is submitted
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message state only on input change
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
