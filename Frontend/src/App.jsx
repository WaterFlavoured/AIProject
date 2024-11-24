import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import MainPage from './components/MainPage'
import './App.css'

function App() {
  const [navVisible, setNavVisible] = useState(true);

  function toggleNav() {
    setNavVisible(!navVisible);
  }
  return (
    <div className='main'>
      {navVisible && <Navbar toggleNav={toggleNav}/>}
      <MainPage />
    </div>
  )
}

export default App
