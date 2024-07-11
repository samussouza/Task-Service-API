import "./Cadastro.css"

import { useState } from "react"


function Cadastro() {

    const userRegister = async (event) => {
        event.preventDefault(); //Para evitar que a pagina seja carregada no envio do form.

        //const response com feth
        const response = await fetch('http://localhost:4000/novoUsario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //Por as variaveis
            })
        });
        try {
            if (response.ok) {
                const data = await response.json();
                console.log('Resposta do servidor:', data);
                alert("Cadastro realizado com sucesso!")
            } else {
                throw new Error('Erro ao realizar o cadastro')
            }
        } catch (error) {
            console.error('Erro na requisição:', error.message);
        };
    }

    return (
        <div className="container">

            <form onSubmit={userRegister}>
                <h1>Cadastr</h1>


            </form>

        </div>
    )

}




export default Cadastro;


