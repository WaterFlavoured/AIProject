import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import MainPage from './components/MainPage'
import { useEffect } from 'react';
import { createContext, useContext } from 'react'
import './App.css'

function App() {
  const [navVisible, setNavVisible] = useState(true);

  // const NavbarContext = createContext();
  // const useNavbarContext = () => useContext(NavbarContext);

  function toggleNav() {
    setNavVisible(prevVisible => !prevVisible);
    console.log(navVisible);
  }
  
  return (
    <div className='main'>
      {/* <NavbarContext.Provider value={{navVisible, toggleNav}} > */}
        {navVisible && <Navbar toggleNav={toggleNav} navVisible={navVisible}/>}
      {/* </NavbarContext.Provider> */}
      <MainPage toggleNav={toggleNav} navVisible={navVisible}/>
    </div>
  )
}

export default App
