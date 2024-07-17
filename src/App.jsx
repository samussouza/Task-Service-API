import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import LoginCad from './Components/Login/Login';
import Cadastro from './Components/Cadastro/Cadastro';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import AdditionalDivToken from './Components/ResetPassword/AdditionalDivToken/AdditionalDivToken';
import Home from './Components/Home/home'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/additionalDiv" element={<AdditionalDivToken />} />
        <Route path="/login" element={<LoginCad />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
