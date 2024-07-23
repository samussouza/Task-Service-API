const crypto = require('crypto');
const transporter = require('./emailConfig');
const database = require('../database/connection');
const generateToken = require('./generateToken');

// Função para enviar email com o token gerado
async function enviarEmailCadastro(req, res) {
    const { userEmail } = req.body;

    // Função de validação de email e atualização do banco de dados
    const validarEmailEAtualizar = async () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM usuario WHERE email = ? ";
            const value = [userEmail];

            database.query(query, value, (error, results) => {
                if (error) {
                    console.error('Erro ao validar email:', error);
                    reject('Erro ao validar email');
                } else if (results.length >= 1) {
                    const user = results[0];
                    console.log("Email validado com sucesso ", user);
                    
                    const tokenJWT = generateToken(user.id);

                    const updateQuery = "UPDATE usuario SET reset_token = ?, reset_token_expires = ? WHERE id = ?;";
                    const now = new Date();
                    const expiryDate = new Date(now.getTime() + (1 * 60 * 60 * 1000));
                    const values = [tokenJWT, expiryDate, user.id];

                    database.query(updateQuery, values, (updateError) => {
                        if (updateError) {
                            console.error('Erro ao atualizar o banco de dados:', updateError);
                            reject('Erro ao atualizar o banco de dados');
                        } else {
                            resolve({
                                message: "Banco de dados atualizado com sucesso!",
                                email: user.email,
                                id: user.id,
                                tokenJWT // Inclui o tokenJWT no resultado
                            });
                        }
                    });
                } else {
                    console.log('Usuário não encontrado com o email informado');
                    reject('Usuário não encontrado ou email incorreto');
                }
            });
        });
    };

    try {
        const resultado = await validarEmailEAtualizar(); // Chama a função de validação e atualização
        console.log('Token gerado:', resultado.tokenJWT);

        const assunto = 'Redefinir senha';
        const conteudo = `<p>Você solicitou a redefinição de senha. Utilize o link abaixo para redefinir sua senha:</p>
        <p><a href="http://192.168.18.53:5173/additionalDiv?token=${resultado.tokenJWT}">Clique aqui para redefinir sua senha</a></p>
        <i>O código expira em uma hora.</i>`;

        const emailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: assunto,
            html: conteudo
        };

        transporter.sendMail(emailOptions, (err, info) => {
            if (err) {
                console.log('Erro ao enviar email:', err);
                res.status(500).json({ error: 'Erro ao enviar email' });
            } else {
                console.log('Email enviado:', info.response);
                res.json({ message: 'Email enviado com sucesso', token: resultado.tokenJWT });
            }
        });

    } catch (error) {
        console.error('Erro no processo de envio:', error);
        if (error === 'Erro ao validar email') {
            return res.status(500).send({ error });
        } else if (error === 'Usuário não encontrado ou email incorreto') {
            return res.status(401).send({ error });
        } else if (error === 'Erro ao atualizar o banco de dados') {
            return res.status(500).send({ error });
        }
    }
}

module.exports = enviarEmailCadastro;
