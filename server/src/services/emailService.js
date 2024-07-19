const nodemailer = require('nodemailer');
const crypto = require('crypto');
const database = require('../database/connection');

// Função para gerar um token criptograficamente seguro composto apenas por números
function gerarTokenNumerico() {
    const token = crypto.randomBytes(3).toString('hex').toUpperCase(); // Gerando um token de 6 caracteres hexadecimais
    return token; // Retornando o token gerado
}

// Função para enviar email com o token gerado
async function enviarEmailCadastro(req, res) {
    const { userEmail } = req.body;
    const token = gerarTokenNumerico(); // Gerando o token

    // Abertura do serviço de transporte para enviar email
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samuel18tao@gmail.com', // Substitua pelo seu email
            pass: 'jcjy jrgj qbnd afsa' // Substitua pela sua senha
        }
    });

    // Função de validação de email
    const validarEmail = async () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM usuario WHERE email = ? ";
            const value = [userEmail];

            database.query(query, value, (error, results) => {
                if (error) {
                    console.error('Erro ao validar email:', error);
                    reject('erro ao validar email');
                } else if (results.length >= 1) {
                    console.log("Email validado com sucesso " + results[0]);
                    resolve({ message: "Email validado com sucesso", email: results[0] });
                } else {
                    console.log('Usuário não encontrado com o email informado');
                    reject('Usuário não encontrado ou email incorreto');
                }
            });
        });
    };

    try {
        await validarEmail(); // Chama a função de validação de email
    } catch (error) {
        if (error === 'erro ao validar email') {
            return res.status(500).send({ error });
        } else if (error === 'Usuário não encontrado ou email incorreto') {
            return res.status(401).send({ error });
        }
    }

    const assunto = 'Redefinir senha';
    const conteudo = `<p>Utilize o seguinte token para redefinir sua senha:</p>
                      <h1>CÓDIGO</h1>
                      <p>
                          <h2>${token}</h2>
                      <p/>
                      `;

    const emailOptions = {
        from: 'seuemail@gmail.com', // Substitua pelo seu email
        to: userEmail, // Substitua pelo email do destinatário
        subject: assunto,
        html: conteudo
    };

    transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
            console.log('Erro ao enviar email:', err);
            res.status(500).json({ error: 'Erro ao enviar email' });
        } else {
            console.log('Email enviado:', info.response);
            res.json({ message: 'Email enviado com sucesso', token });
        }
    });
}

module.exports = enviarEmailCadastro;
