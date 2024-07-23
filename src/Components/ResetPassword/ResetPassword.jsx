import React, { useState } from 'react';
import styles from './ResetPassword.module.css';
import AdditionalDivToken from './AdditionalDivToken/AdditionalDivToken';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [userEmail, setUserEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [containerDisplay, setContainerDisplay] = useState('block');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const envForm = async (event) => {
        event.preventDefault();

        setLoading(true);

        if (!validateEmail(userEmail)) {
            setErrorMessage('Email inválido');
            return;
        }
        sessionStorage.setItem("EMAIL_USER", setUserEmail)
        try {
            const response = await fetch('api/emailService/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setErrorMessage("O email informado não está cadastrado");
                } else {
                    throw new Error('Erro ao resetar senha');
                }
            } else {
                const data = await response.json();
                console.log('Resposta do servidor:', data);
                console.log(data.token);
                // setToken(data.token);
                sessionStorage.setItem("TOKEN_RESET", data.token)
                sessionStorage.setItem("USER_ID_RESET", data.id);

                setErrorMessage(''); // Limpa mensagem de erro se houver
                setSuccessMessage('Email enviado com sucesso!'); // Define mensagem de sucesso


                setTimeout(() => {
                    navigate('/login')
                }, 3000);
            }
        } catch (error) {
            console.error('Erro na requisição:', error.message);
            setErrorMessage('Erro ao resetar senha: ' + error.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className={styles['container']} >
            <form className={styles['formReset']}
                onSubmit={envForm}
                style={{ display: containerDisplay }}>
                <h1 className={styles.titleForm}>Recuperar Senha</h1>
                <div className={styles['field-input']}>
                    <p>Informe o email cadastrado em nossa plataforma:</p>
                    <input className={styles.input}
                        placeholder='email@email.com'
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                {errorMessage && <span className={styles['error-message']}>{errorMessage}</span>}
                {/*Disable não permite cliques enquanto loading for true*/}
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Enviando..." : "Entrar"}
                </button>
                {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
            </form>


        </div>
    );
}

// function TokenValidation({ token }) {
//     const [tokenUser, setTokenUser] = useState("");
//     const [validationMessage, setValidationMessage] = useState("");
//     const [showNewPassword, setNewPassword] = useState(false);
//     const [idUser, setIdUser] = useState("");

//     const validate = (e) => {
//         e.preventDefault();
//         if (tokenUser === token) {
//             setValidationMessage("Token válido!");

//         } else {
//             setValidationMessage("Token inválido!");
//             setNewPassword(true);
//         }
//     };

//     const [userSenha, setUserSenha] = useState("");
//     const [userRepeatSenha, setUserRepeatSenha] = useState("");

//     const envForm = async (e) => {
//         e.preventDefault();


//         try {
//             const response = await fetch('http://localhost:4000/emailService/changePassword', {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application-json"
//                 },
//                 body: JSON.stringify({ password: userSenha, email: sessionStorage.EMAIL_USER })
//             });
//             if (response.ok) {
//                 const data = response.json();
//                 console.log("Resposta do servidor:" + data);
//             } else {
//                 throw new Error("Erro ao alterar a senha!")
//             }
//         } catch (error) {
//             console.error('Erro na requisição:', error.message);
//         }
//     }

//     return (
//         <div>
//             <p>Informe o token:</p>
//             <form onSubmit={validate}>
//                 <input
//                     type="text"
//                     value={tokenUser}
//                     onChange={(e) => setTokenUser(e.target.value)}
//                     placeholder="Insira o token "
//                 />
//                 <button type="submit">Validar</button>
//             </form>
//             <p>{validationMessage}</p>

//             {showNewPassword && <div>
//                 <div className={styles.formNewPassword}>
//                     <h3 className={styles.titleFormNewPassword}>Insira sua nova senha</h3>
//                     <form onSubmit={envForm} >
//                         <label>
//                             Senha:
//                             <input type='password' placeholder='******' value={userSenha} onChange={(e) => setUserSenha(e.target.value)} />
//                         </label>
//                         <label>
//                             Repita novamente:
//                             <input type="password" placeholder='******' value={userRepeatSenha} onChange={(e) => setUserRepeatSenha(e.target.value)} />
//                         </label>
//                         <button>Mudar</button>
//                     </form>
//                 </div>
//             </div>}
//         </div>
//     );
// }

export default ResetPassword;
