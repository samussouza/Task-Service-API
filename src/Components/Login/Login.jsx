import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./Login.module.css";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const validateIFields = () => {
    const regexEmail = /^[^\s@\.]+@[^\s@]+\.[^\s@]+$/;
    const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\d)(?=.*[@*!.#$%&]).{8,}$/;

    setEmailError(false);
    setPasswordError(false);

    if (!userEmail || !userPassword) {
      setEmailError(true);
      setPasswordError(true)
      setErrorMessage("Por favor, preencha todos os campos.");
      return false;
    }
    else if (!regexEmail.test(userEmail)) {
      setEmailError(true);
      setErrorMessage("Email inválido!");
      return false;
    }
    else if (!regexSenha.test(userPassword)) {
      setPasswordError(true);
      setErrorMessage("Senha inválida!");
      return false;
    }
    setErrorMessage(""); // Limpa a mensagem de erro se tudo estiver correto
    return true;
  }

  const envForm = async (event) => {
    event.preventDefault();

    if (!validateIFields()) {
      return;
    }

    setLoading(true); // Inicia o carregamento

    // Utilizando o método URLSearchParams para lidar com os valores de requisição
    const params = new URLSearchParams({
      email: userEmail,
      password: userPassword
    });

    try {
      const response = await fetch(`api/usuario/validateUser?${params.toString()}`, {
        method: "GET"
      });

      if (!response.ok) {
        // Lê a resposta de erro do servidor
        const data = await response.json();
        setLoading(false);
        throw new Error(data.message || "Erro ao validar usuário");
      }

      const data = await response.json();
      console.log("Resposta do servidor (login): ", data);

      sessionStorage.setItem("NAME_USER", data.user.nome);
      sessionStorage.setItem("EMAIL_USER", data.user.email);
      sessionStorage.setItem("SENHA USER", data.user.senha);
      sessionStorage.setItem("ID_USER", data.user.id);

      setSuccessMessage("Usuário validado!");

      setTimeout(() => {
        navigate("/home");
        setSuccessMessage("");
      }, 1000);

      setErrorMessage("");
    } catch (error) {
      console.error("Erro na requisição de validar usuário: ", error.message);
      setErrorMessage(`Erro: ${error.message}`);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.flexContainer}>
        <div className={Styles.divImg}></div>
        <div className={Styles.divForm}>
          <form onSubmit={envForm}>
            <h1 className={Styles.titleForm}>Acesse o Sistema</h1>
            <div className={Styles["input-field"]}>
              <input
                className={`${Styles.input} ${userEmail && emailError ? Styles.errorStyle : ""}`}
                type="text"
                value={userEmail}
                placeholder=" "
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <label className={Styles.label}>Email</label>
            </div>
            <div className={Styles["input-field"]}>
              <input
                className={`${Styles.input} ${userPassword && passwordError ? Styles.errorStyle : ""}`}
                type="password"
                value={userPassword}
                placeholder=" "
                onChange={(e) => setUserPassword(e.target.value)} />
              <label className={Styles.label}>Senha</label>
            </div>
            <div className={Styles["recall-forget"]}>
              <label className={Styles.labelCheck}>
                <input className={Styles.inputCheck} type="checkbox" id="rememberMe" />
                Lembre de mim
              </label>
              <Link className={Styles.link} to="/resetPassword">Esqueceu a senha?</Link>
            </div>
            <button className={Styles.button} type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </button>
            <div className={Styles["signup-link"]}>
              <p>
                Não tem uma conta? <Link className={Styles.link} to="/cadastro">Registrar</Link>
              </p>
            </div>
            {errorMessage && <span className={Styles.errorMessage}>{errorMessage}</span>}
            {successMessage && <span className={Styles.successMessage}>{successMessage}</span>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
