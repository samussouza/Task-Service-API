// import { head } from "../../../server/src/routes/usuario";
import styles from "./Cadastro.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Cadastro() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [errorMessage, showErrorMessage] = useState("");
    const [successMessage, showSuccessMessage] = useState("");
    const navigate = useNavigate();

    const userRegister = async (event) => {
        event.preventDefault(); //Para evitar que a pagina seja carregada no envio do form.
       
        // const validationMessage = fieldsValidations(userName, userEmail, userPassword);
        // showErrorMessage(validationMessage);

        // if (validationMessage) {
        //     return false;
        // }

        //const response com feth
        const response = await fetch('api/usuario/registerUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //Por as variaveis
                nome: userName,
                email: userEmail,
                senha: userPassword
            })
        });
        try {
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status == 409) {
                    showErrorMessage("Email já cadastrado");
                    showSuccessMessage("");
                } else {
                    throw new Error('Erro ao realizar o cadastro');
                   
                }
                console.log('Resposta do servidor:', errorData);
            }
            else {
                const data = await response.json();
                console.log('Resposta do servidor:', data);
                showSuccessMessage("Cadastro realizado com sucesso!");

                setTimeout(() => {
                    navigate("/login");
                }, 5000)
                showErrorMessage("");
            }
        } catch (error) {
            console.error('Erro na requisição:', error.message);
        };
    }

    return (
        <div className={styles.container}>
            <div className={styles.childContainer}>
                <div className={styles.oneCardAligned}>
                    <img src="https://img.freepik.com/vetores-premium/testando-o-conceito-com-personagem-pessoas-respondendo-a-lista-de-verificacao-do-questionario-e-ao-resumo-do-resultado-de-sucesso-exame-online-formulario-de-questionario-educacao-online-metafora-de-pesquisa_269730-429.jpg" alt="" />
                </div>
                <div className={styles.duoCardAligned}>
                    <h1>Cadastrar-se</h1>
                    <form onSubmit={userRegister}>
                        <input className={styles.input} type="text"
                            placeholder="Nome"
                            value={userName} onChange={(e) => { setUserName(e.target.value) }}
                        />
                        <input className={styles.input} type="text"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => { setUserEmail(e.target.value) }}
                        />
                        <input className={styles.input} type="password"
                            placeholder="Senha"
                            value={userPassword}
                            maxLength={20}
                            onChange={(e) => { setUserPassword(e.target.value) }}
                        />
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        <button className={styles.button}>Cadastrar</button>
                        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}


    // function fieldsValidations(nome, email, senha) {

    //     // const isEmail = email.vim();
    //     // const isName = nome.vim();
    //     // const isSenha = senha.vim();

    //     // const regexEmail = /@.com/;
    //     const minlengthSenha = senha.length < 8;
    //     const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.!#])$/

    //     if (!nome || !email || !senha) {
    //         return "Todos os campos são obrigatórios!";
    //     } 
    //     // else if (!regexEmail.test(email)) {
    //     //     return "Email inválido!";
    //     // } 
    //     else if (minlengthSenha || regexSenha) {
    //         return "A senha precisa ter 8 caracteres com letra maiúscula, minúscula, número e caractere especial.";
    //     }
    //     return "";

    // }

export default Cadastro;



