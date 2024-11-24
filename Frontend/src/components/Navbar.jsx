import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons'
import { useEffect } from 'react';
// import { useNavbarContext } from '../App.jsx'
const Navbar = ({ navVisible, toggleNav }) => {
  // const { navVisible, toggleNav } = useNavbarContext();
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

  return (
    <div className='navb'>
      <div className='toggleButtons'>
        <button onClick={toggleNav} className='leftButton'>
          <FontAwesomeIcon icon={faSquareCaretLeft} />
        </button>
        <button className='newButton'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    </div>
  )
}

export default Navbar