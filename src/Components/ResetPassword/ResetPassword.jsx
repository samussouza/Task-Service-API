import React, { useState } from 'react';
import styles from './ResetPassword.module.css';
// import AdditionalDivToken from './AdditionalDivToken/AdditionalDivToken';

function ResetPassword() {
    const [userEmail, setUserEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
    const [containerDisplay, setContainerDisplay] = useState('block');
    const [token, setToken] = useState('');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const envForm = async (event) => {
        event.preventDefault();

        if (!validateEmail(userEmail)) {
            setErrorMessage('Email inválido');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/emailService/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail })
            });

            if (!response.ok) {
                throw new Error('Erro ao resetar senha');
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);
            console.log(data.token);
            setToken(data.token);

            setErrorMessage(''); // Limpa mensagem de erro se houver
            setSuccessMessage('Email enviado com sucesso!'); // Define mensagem de sucesso
           
            setShowAdditionalDiv(true); // Mostra o componente de validação de token

            setTimeout(() => {
                setContainerDisplay('none'); // Esconde o container após sucesso
            }, 3000);

        } catch (error) {
            console.error('Erro na requisição:', error.message);
            setErrorMessage('Erro ao resetar senha: ' + error.message);
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
                <button type="submit" className={styles.button}>Enviar</button>
                {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
            </form>

            {showAdditionalDiv && <tokenValidation token={token} userEmail={userEmail} />}
        </div>
    );
}


function tokenValidation({ token}) {
    const [tokenUser, setTokenUser] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    const validate = (e) => {
        e.preventDefault();
        
        if (tokenUser === token) {
            setValidationMessage("Token válido!");
        } else {
            setValidationMessage("Token inválido!");
        }
    };

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
        </div>
    );
}

export default ResetPassword;