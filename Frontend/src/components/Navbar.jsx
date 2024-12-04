import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons'
import { useEffect } from 'react';
// import { useNavbarContext } from '../App.jsx'
const Navbar = ({ navVisible, toggleNav, chats, setChats, currentChatId, setCurrentChatId }) => {
  useEffect(() => {
    const navbar = document.querySelector('.navb');
    if (navbar) {
      navbar.style.transition = 'transform 1s ease-in-out';
      navbar.style.transform = navVisible ? 'translateX(0)' : 'translateX(-100%)';
    }
  }, [navVisible]);

  const handleNewChat = () => {
    if (chats.length < 10) {
      const newChatId = chats.length + 1;
      const newChat = { 
        id: newChatId, 
        name: `Chat#${newChatId}`,
        messages: [
          {
            id: 1,
            who: 'DrYangGPT',
            text: 'Hi! I\'m YangGPT, a text-based AI model trained on the GPT-3 architecture. I can generate text based on the prompts you give me. Try typing something in the text box below and see what I come up with!'
          }
        ]
      };
      setChats((prevChats) => [...prevChats, newChat]);
      setCurrentChatId(newChatId);
    } else {
      alert('You can only create up to 10 chats!');
    }
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  return (
    <div className="navb">
      <div className="toggleButtons">
        <button onClick={toggleNav} className="leftButton">
          <FontAwesomeIcon icon={faSquareCaretLeft} />
        </button>
        <button onClick={handleNewChat} className="newButton">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      <div className="chatList">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chatItem ${chat.id === currentChatId ? 'active' : ''}`}
            onClick={() => handleSelectChat(chat.id)}
          >
            {chat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar