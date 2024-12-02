import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import MainPage from './components/MainPage'
import { useEffect } from 'react';
import { createContext, useContext } from 'react'
import './App.css'

function App() {
  const [chats, setChats] = useState([]); // State to hold the list of chats
  const [currentChatId, setCurrentChatId] = useState(null); // State for selected chat
  const [navVisible, setNavVisible] = useState(true); // State for toggling navbar visibility
  //Is this next part needed?
  const NavbarContext = createContext();
  const useNavbarContext = () => useContext(NavbarContext);

  // Function for toggling navbar visibility
  function toggleNav() {
    setNavVisible((prevVisible) => !prevVisible); // Inverting current state
  }
  
  return (
    <div className='main'>
      {/* <NavbarContext.Provider value={{navVisible, toggleNav}} > */}
        {navVisible && 
        <Navbar 
        toggleNav={toggleNav}  // Passing function toggleNav to NavBar
        navVisible={navVisible} // Passing visibility state to NavBar
        chats={chats} // Passing chat list to NavBar
        setChats={setChats} // Passing function to update chats
        currentChatId={currentChatId} // Passing current chat ID to NavBar
        setCurrentChatId={setCurrentChatId} // Passing function for updating current chat ID to NavBar
        />
        }
      {/* </NavbarContext.Provider> */}
      <MainPage 
      toggleNav={toggleNav} // Passing toggleNav to MainPage
      navVisible={navVisible} // Passing visibility state to MainPage
      chats={chats} // Passing list of chats to MainPage
      currentChatId={currentChatId} // Passing currnt chat ID to MainPage
      />
    </div>
  )
}

export default App
