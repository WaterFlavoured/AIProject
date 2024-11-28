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
      if (navVisible) {
        navbar.style.transition = 'transform 1s ease-in-out';
        navbar.style.transform = 'translateX(0)';
      } else {
        navbar.style.transition = 'transform 1s ease-in-out';
        navbar.style.transform = 'translateX(-100%)';
      }
    }
  }, [navVisible]);

  // Create a new chat
  const handleNewChat = () => {
    if (chats.length < 10) {
      const newChatId = chats.length + 1;
      const newChat = {
        id: newChatId,
        name: `Chat #${newChatId}`,
        messages: [{ text: 'Hi! I\'m YangGPT, a text-based AI model trained on the GPT-3 architecture. I can generate text based on the prompts you give me. Try typing something in the text box below and see what I come up with!', who: 'DrYangGPT' }],
      };
      setChats((prevChats) => [...prevChats, newChat]);
      setCurrentChatId(newChatId); // Automatically select the new chat
    } else {
      alert('You can only create up to 10 chats!');
    }
  };

  // Handle selecting a chat
  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  return (
    <div className='navb'>
      <div className='toggleButtons'>
        <button onClick={toggleNav} className='leftButton'>
          <FontAwesomeIcon icon={faSquareCaretLeft} />
        </button>
        <button onClick={handleNewChat} className='newButton'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>

      {/* Display the list of chats */}
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