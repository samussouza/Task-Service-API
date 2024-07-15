import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
import Login from './Components/Login/Login'; 
import Cadastro from './Components/Cadastro/Cadastro'; 
import ResetPassword from './Components/ResetPassword/ResetPassword'; 
import AdditionalDivToken from './Components/ResetPassword/AdditionalDivToken/AdditionalDivToken';
// import Home from './Components/Home/home'
function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/additionalDiv" element={<AdditionalDivToken />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
