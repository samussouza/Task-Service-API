import React, { useState } from 'react';
import styles from './ResetPassword.module.css';
import AdditionalDivToken from './AdditionalDivToken/AdditionalDivToken';
// import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [userEmail, setUserEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
    const [containerDisplay, setContainerDisplay] = useState('block');
    const navigate = useNavigate();

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

            setErrorMessage(''); // Limpa mensagem de erro se houver
            setSuccessMessage('Email enviado com sucesso!'); // Define mensagem de sucesso
            setShowAdditionalDiv(true); // Exibe a AdditionalDivToken

            setTimeout(() => {
                setContainerDisplay('none'); // Esconde o container após sucesso
                // navigate('/additionalDiv'); // Navega para outra rota após 3 segundos
            }, 3000);

        } catch (error) {
            console.error('Erro na requisição:', error.message);
            setErrorMessage('Erro ao resetar senha: ' + error.message);
        }
    };

    return (
        <div className={styles['container']} style={{ display: containerDisplay }}>
            <form className={styles['formReset']} onSubmit={envForm}>
                <h1>Recuperar Senha</h1>
                <div className={styles['field-input']}>
                    <p>Informe o email cadastrado em nossa plataforma:</p>
                    <input
                        placeholder='email@email.com'
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
                {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
                <button type="submit">Enviar</button>
            </form>

            {showAdditionalDiv && <AdditionalDivToken />}
        </div>
    );
}

export default ResetPassword;
