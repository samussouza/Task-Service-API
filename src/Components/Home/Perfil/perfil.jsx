import Styles from './perfil.module.css';
import { React, useEffect, useState } from 'react';

function perfil() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const storedName = sessionStorage.NAME_USER;
        const storedEmail = sessionStorage.EMAIL_USER;
        setUserName(storedName);
        setUserEmail(storedEmail);
    });
    const fileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setImage(file);
            setImageUrl(url);
        } else {
            return "Arquivo inválido"
        }
        //Adicionar validações de formato de arquivo
    }

    const uploadImage = () => {
        const formData = new FormData();
        formData.append('image', image);

        fetch('api/usuario/upload', {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log("Upload da foto de peril realizada com sucesso", data);
            })
            .catch(error => {
                console.error("Erro ao enviar a imagem: ", error.message);
            });
    }

    return (
        <div className={Styles.container}>
            <div style={{ position: "absolute", top: 50, right: 50, }}>
                <input type="file" onChange={fileChange} />
                <br />
                <button onClick={uploadImage}>Salvar</button>
            </div>
            <div className={Styles.containerContent}>
                <div className={Styles.flexContainer}>
                    <div className={Styles.compenentUserImage}>
                        <div className={Styles.userImage}>
                            <img src={imageUrl} alt="User" />
                        </div>
                        <div className={Styles.informationUser}>
                            <h2>{userName}</h2>
                            <span>{userEmail}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span>User desde</span>
                    <div className={Styles['input-fields']}>
                        <label htmlFor="name">Nome</label>
                        <input id="name" type="text" />
                    </div>
                    <div className={Styles['input-fields']}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="text" />
                    </div>
                    <h1>Change Password</h1>
                    <div className={Styles['input-fields']}>
                        <label htmlFor="current-password">Senha atual*</label>
                        <input id="current-password" type="password" placeholder='*******' />
                    </div>
                    <div className={Styles['input-fields']}>
                        <label htmlFor="new-password">Nova Senha*</label>
                        <input id="new-password" type="password" placeholder='*******' />
                    </div>
                    <div className={Styles['input-fields']}>
                        <label htmlFor="confirm-new-password">Confirma Nova Senha*</label>
                        <input id="confirm-new-password" type="password" placeholder='*******' />
                    </div>
                    <button className={Styles.button}>Atualizar Senha</button>
                </div>
            </div>
        </div>
    )
}

export default perfil;
