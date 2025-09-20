import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ChatsProvider from './context/chatsContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChatsProvider>
        <App />
      </ChatsProvider>
    </BrowserRouter>
  </StrictMode>
)
