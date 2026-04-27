import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setAuthToken } from './services/api.js'

const storedToken = localStorage.getItem('pharmacy_token');
if (storedToken) {
  setAuthToken(storedToken);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
