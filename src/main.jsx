import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0D0D0F',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          },
          success: { iconTheme: { primary: '#FFFFFF', secondary: '#050505' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#0D0D0F' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
