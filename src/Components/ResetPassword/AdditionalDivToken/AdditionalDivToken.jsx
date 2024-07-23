import React from "react";
import styles from './AdditionalDivToken.module.css';
import { useState } from "react";

function TokenValidation() {
    const [tokenUser, setTokenUser] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [showNewPassword, setNewPassword] = useState(false);
    const [idUser, setIdUser] = useState("");
   
        
    const validate = (e) => {
        e.preventDefault();
        if (tokenUser == sessionStorage.TOKEN_RESET) {
            setValidationMessage("Token válido!");
            setNewPassword(true);

        } else {
            setValidationMessage("Token inválido!");
           
        }
    };

    const [userSenha, setUserSenha] = useState("");
    const [userRepeatSenha, setUserRepeatSenha] = useState("");

    const envForm = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch('http://localhost:4000/emailService/changePassword', {
                method: "POST",
                headers: {
                    "Content-type": "application-json"
                },
                body: JSON.stringify({ password: userSenha, email: sessionStorage.EMAIL_USER })
            });
            if (response.ok) {
                const data = response.json();
                console.log("Resposta do servidor:" + data);
            } else {
                throw new Error("Erro ao alterar a senha!")
            }
        } catch (error) {
            console.error('Erro na requisição:', error.message);
        }
    }

    return (
        <div>
            <p>Informe o token:</p>
            <form onSubmit={validate}>  
                <input
                    type="text"
                    value={tokenUser}
                    onChange={(e) => setTokenUser(e.target.value)}
                    placeholder="Insira o token "
                />
                <button type="submit">Validar</button>
            </form>
            <p>{validationMessage}</p>

            {showNewPassword && <div>
                <div className={styles.formNewPassword}>
                    <h3 className={styles.titleFormNewPassword}>Insira sua nova senha</h3>
                    <form onSubmit={envForm} >
                        <label>
                            Senha:
                            <input type='password' placeholder='******' value={userSenha} onChange={(e) => setUserSenha(e.target.value)} />
                        </label>
                        <label>
                            Repita novamente:
                            <input type="password" placeholder='******' value={userRepeatSenha} onChange={(e) => setUserRepeatSenha(e.target.value)} />
                        </label>
                        <button>Mudar</button>
                    </form>
                </div>
            </div>}
        </div>
    );
}


export default TokenValidation;