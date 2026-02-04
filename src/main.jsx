import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AppTest from './App.test.jsx'
import AppTest2 from './App.test2.jsx'
import AppTest3 from './App.test3.jsx'
import AppTest4 from './App.test4.jsx'
import AppTest5 from './App.test5.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
