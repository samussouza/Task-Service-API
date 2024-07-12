import React, { useState } from 'react';
// import './ResetPassword.css';
import styles from './ResetPassword.module.css';

function ResetPassword() {
    const [userEmail, setUserEmail] = useState('');

    const envForm = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/resetPassword', {
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
            alert('Senha resetada com sucesso!'); // Exemplo de alerta, personalize conforme necessário

        } catch (error) {
            console.error('Erro na requisição:', error.message);
            alert('Erro ao resetar senha: ' + error.message);
        }
    };

    return (
        <div className={styles['container']}>
            <form className={styles['formReset']} onSubmit={envForm}>
                <h1>Recuperar Senha</h1>
                <div className={styles['field-input']}>
                    <p>Informe o email para validação:</p>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default ResetPassword;
