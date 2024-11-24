import React from 'react'
import './MainPage.css'
import yang from '../assets/yiminyang.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretRight } from '@fortawesome/free-regular-svg-icons'

const MainPage = ({toggleNav, navVisible}) => {
  return (
    <div className={`${!navVisible ? 'mainPageFull' : 'mainPage'}`}>
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
          <h1>Yimin Yang</h1>
        </div>
        <button className='profilePics'>
          <img src={yang} alt="" className='profilePics' />
        </button>
      </nav>
    </div>
  )
}

export default MainPage