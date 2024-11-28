import React from 'react'
import './MainPage.css'
import yang from '../assets/yiminyang.png'
//import TextArea from './TextArea'
import ChatApp from './ChatApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretRight } from '@fortawesome/free-regular-svg-icons'

const MainPage = ({ toggleNav, navVisible, chats, currentChatId }) => {
  const currentChat = chats.find(chat => chat.id === currentChatId);
  return (
    <div className={`${!navVisible ? 'mainPageFull' : 'mainPage'}`}>
      {/* Mini navbar */}
      <nav>
        <div className='logo'>
          {!navVisible && 
            <div className='logobutton'>
              <button className='leftButton' onClick={toggleNav}>
                <FontAwesomeIcon icon={faSquareCaretRight} />
              </button>
              <button className='newButton'>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
          }
          <h1>YangGPT</h1>
        </div>
        <button className='profilePics'>
          <img src={yang} alt="" className='profilePics' />
        </button>
      </nav>

      {/* Main Content */}
      <div className="mainContent">
        {currentChat ? (
          <ChatApp chat={currentChat} />
        ) : (
          <h2>Select a chat or create a new one</h2>
        )}
      </div>
    </div>
  )
}

export default MainPage