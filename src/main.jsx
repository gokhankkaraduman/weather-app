import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/global.css'
import './css/variables.css'
import App from './Components/App/App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
