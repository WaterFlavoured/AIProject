import React from 'react'
import './MainPage.css'
import yang from '../assets/yiminyang.png'
//import TextArea from './TextArea'
import ChatApp from './ChatApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretRight } from '@fortawesome/free-regular-svg-icons'

const MainPage = ({ toggleNav, navVisible, chats, currentChatId }) => {
  const currentChat = chats[currentChatId - 1]; // Getting the currentChat object from the chats array
  
  return (
    // Conditionally apply 'mainPageFull' or 'mainPage' class based on navVisible state
    <div className={`${!navVisible ? 'mainPageFull' : 'mainPage'}`}>
      {/* Mini navbar */}
      <nav>
        <div className='logo'>
          {/* If navigation is not visible, display only buttons*/}
          {!navVisible && 
            <div className='logobutton'>
              {/* Toggle nav visibility button */}
              <button className='leftButton' onClick={toggleNav}>
                <FontAwesomeIcon icon={faSquareCaretRight} />
              </button>
              {/* New chat button */}
              <button className='newButton'>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
          }
          {/* Displaying logo */}
          <h1>YangGPT</h1>
        </div>
        {/* Profile picture*/}
        <button className='profilePics'>
          <img src={yang} alt="" className='profilePics' />
        </button>
      </nav>

      {/* Main Content */}
      <div className="mainContent">
        {/* Render chat using current chat */}
        {currentChat ? (
          <ChatApp chat={currentChat}/>
        ) : (
          //If there is no current chat 
          <h2>Select a chat or create a new one</h2>
        )}
      </div>
    </div>
  )
}

export default MainPage