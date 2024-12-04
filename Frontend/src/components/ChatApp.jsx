import React, { useState } from 'react';
import './ChatApp.css';
import TextBubble from './TextBubble';

const ChatApp = ({ chat, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message); // Pass the new message to MainPage
      setMessage(''); // Clear input
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
            {console.log(msg.who === 'User' ? 'textBubbleRight' : 'textBubbleLeft')}
          </div>
        ))}
      </div>

      <form
        className="messageInput"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
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
