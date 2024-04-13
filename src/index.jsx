import React from 'react'
import ReactDOM from 'react-dom/client'
import AGVDashboardApp from './AGVDashboardApp.jsx'
import { BrowserRouter } from 'react-router-dom';
import './styles/style.css';
import './styles/dpad.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AGVDashboardApp />
    </BrowserRouter>
  </React.StrictMode>,
)
