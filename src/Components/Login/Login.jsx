import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const envForm = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/novaTarefa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, userPassword }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();
      console.log("Resposta do servidor:", data);
      alert("Usuário encontrado!");

      navigate("/cadastro");

    } catch (error) {
      console.error("Erro na requisição:", error.message);
      alert("Erro ao fazer login: " + error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={envForm}>
        <h1>Acesse o Sistema</h1>
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" name="" id="" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu a senha</a>
        </div>

        <button type="submit">Entrar</button>

        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/cadastro">Registrar</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
