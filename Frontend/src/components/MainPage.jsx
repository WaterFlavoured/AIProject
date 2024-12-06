import React from 'react'
import './MainPage.css'
import yang from '../assets/yiminyang.png'
//import TextArea from './TextArea'
import ChatApp from './ChatApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretRight } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
const MainPage = ({ toggleNav, navVisible, chats, setChats, currentChatId }) => {
  const currentChat = chats.find(chat => chat.id === currentChatId) || { messages: [] }; // Find current chat by id

  const handleSendMessage = async (newMessage) => {
  
    const payload = {
      id: Date.now(),
      who: newMessage.who,
      text: newMessage.text
    }
  
    try {
      // Make the POST request
      const response = await axios.post(`http://localhost:3000/api/v1/chat/${currentChatId}`, payload);
      // Check the response and update the state
      if (response.data) {
        setChats((prevChats) => {
          const updatedChats = prevChats.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, newMessage], // Corrected to use `messages` instead of `message`
                }
              : chat
          );
          return updatedChats;
        });
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  return (
    <div className={`${!navVisible ? 'mainPageFull' : 'mainPage'}`}>
      {/* Mini navbar */}
      <nav>
        <div className='logo'>
          {!navVisible && (
            <div className='logobutton'>
              <button className='leftButton' onClick={toggleNav}>
                <FontAwesomeIcon icon={faSquareCaretRight} />
              </button>
              <button className='newButton'>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
          )}
          <h1>DrYangGPT</h1>
        </div>
        <button className='profilePics'>
          <img src={yang} alt="" className='profilePics' />
        </button>
      </nav>

      {/* Main Content */}
      <div className="mainContent">
        {currentChat ? (
          <ChatApp
            chat={currentChat.messages} // Pass the messages array to ChatApp
            onSendMessage={(message, whoId) =>
              handleSendMessage({
                id: currentChat.messages.length + 1, // Increment message ID
                who: whoId,
                text: message,
              })
            }
          />
        ) : (
          <h2>Select a chat or create a new one</h2>
        )}
      </div>
    </div>
  );
};

export default MainPage