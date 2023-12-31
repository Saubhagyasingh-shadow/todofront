import Register from './components/Register';
import Header from './components/partials/Header';
import Home from './components/Home';
import Login from './components/Login';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
   

  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login />}/>

      </Routes>
      </BrowserRouter>
  );
}

export default App;
