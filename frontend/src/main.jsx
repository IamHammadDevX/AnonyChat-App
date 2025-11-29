import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Admin from './Admin.jsx'
import './index.css'

const path = window.location.pathname
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {path === '/admin' ? <Admin /> : <App />}
  </React.StrictMode>
)
