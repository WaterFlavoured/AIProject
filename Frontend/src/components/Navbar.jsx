import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons'
const Navbar = ({toggleNav}) => {
  return (
    <div className='navb'>
      <div className='toggleButtons'>
        <button onClick={toggleNav}>
          <FontAwesomeIcon icon={faSquareCaretLeft} />
        </button>
        <button>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    </div>
  )
}

export default Navbar