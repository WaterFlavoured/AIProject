import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons'
import { useEffect } from 'react';
// import { useNavbarContext } from '../App.jsx'
const Navbar = ({ navVisible, toggleNav, chats, setChats, currentChatId, setCurrentChatId }) => {
  //Handling the animation of navBar sliding 
  useEffect(() => {
    const navbar = document.querySelector('.navb');
    if (navbar) {
      if (navVisible) { //If the bar is visible, the bar slides in from left (opens nav bar) 
        navbar.style.transition = 'transform 1s ease-in-out';
        navbar.style.transform = 'translateX(0)';
      } else { //If bar is not visible, the bar slides from the right (hiding nav bar)
        navbar.style.transition = 'transform 1s ease-in-out';
        navbar.style.transform = 'translateX(-100%)';
      }
    }
  }, [navVisible]); // Trigger when navVisible is changed

  // Creating a new chat
  const handleNewChat = () => {
    // Limiting user to 10 open chats
    if (chats.length < 10) {
      const newChatId = chats.length + 1; // Assgning the new chat with an ID
      const newChatMessages = [ // Automatic first message 
        {
          id: 1,
          who: 'DrYangGPT',
          text: 'Hi! I\'m YangGPT, a text-based AI model trained on the GPT-3 architecture. I can generate text based on the prompts you give me. Try typing something in the text box below and see what I come up with!'
        }
      ];
      setChats((prevChats) => [...prevChats, newChatMessages]); //Updating chats array with the new chat
      setCurrentChatId(newChatId); // Automatically select the new chat
    } else {
      // Alerting max 10 chats has been reached
      alert('You can only create up to 10 chats!');
    }
  };

  // Selecting existing chat
  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId); //Updating chatId with the id of the selected chat
  };
 
  return (
    <div className='navb'>
      {/* Navbar buttons */}
      <div className='toggleButtons'>
        <button onClick={toggleNav} className='leftButton'>
          {/* Toggle nav button icon */}
          <FontAwesomeIcon icon={faSquareCaretLeft} />
        </button>
        <button onClick={handleNewChat} className='newButton'>
          {/* New chat button icon */}
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      {/* Display the list of chats */}
      <div className="chatList">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chatItem ${chat.id === currentChatId ? 'active' : ''}`}
            onClick={() => handleSelectChat(chat.id)} //Selecting clicked chat
          >
            {chat.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Navbar