import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {Routes,Route} from "react-router-dom";
import Signup from './pages/Signup';

function App() {
  
          return(
            <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/Dashboard' element={<Dashboard/>}></Route>
              <Route path="/signup" element={<Signup />} />

            </Routes>
          )
}

export default App
