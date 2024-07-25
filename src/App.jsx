import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import LoginCad from './Components/Login/Login';
import Cadastro from './Components/Cadastro/Cadastro';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import AdditionalDivToken from './Components/ResetPassword/AdditionalDivToken/AdditionalDivToken';
import Home from './Components/Home/home';
import Perfil from './Components/Home/Perfil/perfil';
import Menu from './Components/Home/Menu/menu';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex',   backgroundColor: "#e3e9f7"}}>
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/additionalDiv" element={<AdditionalDivToken />} />
          <Route path="/login" element={<LoginCad />} />
          <Route path="/home" element={<Home />} />
          <Route path='/perfil' element={<Perfil />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
