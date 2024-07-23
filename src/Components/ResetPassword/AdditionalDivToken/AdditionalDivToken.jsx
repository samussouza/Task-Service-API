import React from "react";
import styles from './AdditionalDivToken.module.css';
import { useState } from "react";
import { useSearchParams } from 'react-router-dom';

function TokenValidation() {
    //usar useEffect
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
 
    const [validationMessage, setValidationMessage] = useState("");
    const [userSenha, setUserSenha] = useState("");
    const [userRepeatSenha, setUserRepeatSenha] = useState("");

    
    const envForm = async (e) => {
        e.preventDefault();

        if (userSenha !== userRepeatSenha){
            setUserRepeatSenha("As senhas não correspondem!");
            return;
        }

        try {
            const response = await fetch('api/emailService/changePassword', {
                method: "POST",
                headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify({ newPassword: userSenha, tokenUser: token})
            });
            if (response.ok) {
                const data = response.json();
                console.log("Resposta do servidor:" + data);
                setValidationMessage("Senha alterada com sucesso!");
            } else {
                throw new Error("Erro ao alterar a senha!")
            }
        } catch (error) {
            console.error('Erro na requisição:', error.message);
            setValidationMessage(error.message);
        }
    }

    return (
        <div>
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
                        {validationMessage && <p>{validationMessage}</p>}
                    </form>

                </div>
         
        </div>
    );
}


export default TokenValidation;