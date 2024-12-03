This project is going to be a chatbot with the implementation of LLMs using Hugging Face interface.
Idk whatelse to say :D

Ok general gist:
- We're gonna make a general chatbot of sort (this can be changed to a different topic ofc)
- Two folders, LLM and frontend (the website)
- I'll have you work on implementing the python code for the LLM, Ms. ExpertPythonDeveloper
- There's gonna be some GitHub best practice things I'll have to somehow explain to you/demonstrate?
You sent
I'll be working on frontend mostly, and have input into ur stage of LLM
You sent
If github doesn't work out, than we can try something called VSCode live(?) which is like working with a shared Word/Google doc
You sent
If there's C/C++ stuff, I can work on that/try to

<!-- 
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const socket = io('http://127.0.0.1:5000');

function App() {
  const [count, setCount] = useState(0)

  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
      // Listen for messages from the server
      socket.on('response', (data) => {
          setChatLog((prev) => [...prev, { who: 'bot', message: data.message }]);
          console.log(data.message);
      });

      // Handle errors
      socket.on('error', (data) => {
          setChatLog((prev) => [...prev, { who: 'bot', message: data.message }]);
          
      });

      return () => {
          socket.off('response');
          socket.off('error');
      };
  }, []);

  const handleSend = () => {
      if (!userInput.trim()) return;

      // Add the user's message to the chat log
      setChatLog([...chatLog, { who: 'user', message: userInput }]);

      // Send the user's message to the server
      socket.emit('message', { input: userInput });

      // Clear the input field
      setUserInput('');
  };
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            {chatLog.map((entry, index) => (
                <div key={index} style={{ margin: '5px 0' }}>
                    <strong>{entry.who === 'user' ? 'You' : 'AI'}:</strong> {entry.message}
                </div>
            ))}
        </div>
        <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            style={{ width: '80%', marginRight: '10px', padding: '10px' }}
        />
        <button onClick={handleSend} style={{ padding: '10px 20px' }}>
            Send
        </button>
    </div>
);
}

export default App

Just a few setup things, if implement backend, only call to update array when refresh page or when user first
loads website.  
-->