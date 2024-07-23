import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false); // Novo estado de carregamento
  const navigate = useNavigate();

  const envForm = async (event) => {
    event.preventDefault();

    if (!userName || !userPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true); // Inicia o carregamento

    try {
      const response = await fetch("api/usuario/validateUser", {
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
      sessionStorage.setItem("NAME_USER", data.user.nome);
      sessionStorage.setItem("ID_USER", data.user.id);

      console.log("Resposta do servidor:", data);
      alert("Usuário encontrado!");

      navigate("/home");

    } catch (error) {
      console.error("Erro na requisição:", error.message);
      alert("Erro ao fazer login: " + error.message);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.divImg}></div>
        <div className={styles.divForm}>
          <form onSubmit={envForm}>
            <h1 className={styles.titleForm}>Acesse o Sistema</h1>
            <div className={styles["input-field"]}>
              <input
                className={styles.input}
                type="email"
                placeholder="E-mail"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                aria-label="E-mail"
              />
              {/* <FaUser className={styles.icon} /> */}
            </div>
            <div className={styles["input-field"]}>
              <input
                className={styles.input}
                type="password"
                placeholder="Senha"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                aria-label="Senha"
              />
              {/* <FaLock className={styles.icon} /> */}
            </div>

            <div className={styles["recall-forget"]}>
              <label className={styles.labelCheck}>
                <input className={styles.inputCheck} type="checkbox" id="rememberMe" />
                Lembre de mim
              </label>
              <Link className={styles.link} to="/resetPassword">Esqueceu a senha?</Link>
            </div>

            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </button>

            <div className={styles["signup-link"]}>
              <p>
                Não tem uma conta? <Link className={styles.link} to="/cadastro">Registrar</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
