import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import './App.css';

function App() {
  const [chats, setChats] = useState([]); // State to hold the list of chats
  const [currentChatId, setCurrentChatId] = useState(null); // State for selected chat
  const [navVisible, setNavVisible] = useState(true); // State for toggling navbar visibility

  // Fetches from database everytime new chat is created
  useEffect(() => {
    if (currentChatId !== null) { // Check if currentChatId is valid
      fetch(`http://localhost:3000/api/v1/get/${currentChatId}`)
        .then(response => response.json())
        .then(data => {
          setChats(prevChats => {
            // Check if the chat already exists
            const existingChatIndex = prevChats.findIndex(chat => chat.id === currentChatId);

            if (existingChatIndex !== -1) {
              // If chat exists, replace it with the new data
              const updatedChats = [...prevChats];
              updatedChats[existingChatIndex] = { ...data };
              return updatedChats;
            } else {
              // If chat doesn't exist, add it to the array
              return [...prevChats, { ...data }];
            }
          });
        })
        .catch(error => console.error('Error fetching chat by ID:', error));
    }
  }, [currentChatId])

  // Function for toggling navbar visibility
  function toggleNav() {
    setNavVisible((prevVisible) => !prevVisible); // Inverting current state
    console.log('Chats:', chats); // Log chats to check if they're being updated
  }

  return (
    <div className='main'>
      {navVisible && 
        <Navbar 
          toggleNav={toggleNav}  
          navVisible={navVisible} 
          chats={chats} 
          setChats={setChats} 
          currentChatId={currentChatId} 
          setCurrentChatId={setCurrentChatId} 
        />
      }
      <MainPage 
        toggleNav={toggleNav} 
        navVisible={navVisible} 
        chats={chats} 
        currentChatId={currentChatId} 
        setChats={setChats} 
      />
    </div>
  );
}

export default App;
