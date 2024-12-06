import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons'
import { useEffect } from 'react';
import axios from 'axios';
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
  
      setChats((prevChats) => [...prevChats, newChat]);  // Add new chat to state
      setCurrentChatId(newChatId);  // Set the current chat to the newly created chat
    } else {
      alert('You can only create up to 10 chats!');
    }
  };
  
  

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const removeChat = async(chatId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/delete/${chatId}`);
      console.log(response.data);
      if (response.data) {
        setChats((prevChats) => {
          const updatedChats = prevChats.map((chat) => 
            chat.id === chatId ? { ...chat, messages: [] } : chat
          );
          return updatedChats;
        });
      } else {
        console.error('Failed to remove chat');
      }
    }catch (error) {
      console.error('Error removing chat:', error);
    }
  }

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
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents click from triggering chat selection
                removeChat(chat.id); // Pass the correct chat.id to remove it
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Navbar