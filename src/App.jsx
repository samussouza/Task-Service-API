import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Components/Login/Login';
import LoginCad from './Components/Login/Login';
import Cadastro from './Components/Cadastro/Cadastro';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import AdditionalDivToken from './Components/ResetPassword/AdditionalDivToken/AdditionalDivToken';
import Home from './Components/Home/home';
import Perfil from './Components/Home/Perfil/perfil';
import Layout from './Layout/layout';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Login /></Layout>} />
        <Route path="/cadastro" element={<Layout><Cadastro /></Layout>} />
        <Route path="/resetPassword" element={<Layout><ResetPassword /></Layout>} />
        <Route path="/additionalDiv" element={<Layout><AdditionalDivToken /></Layout>} />
        <Route path="/login" element={<Layout><LoginCad /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
