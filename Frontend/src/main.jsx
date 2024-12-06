import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Rendering application to root DOM node
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* The main App component */}
  </StrictMode>,
)
