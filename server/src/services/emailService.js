const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Função para gerar um token criptograficamente seguro composto apenas por números
function gerarTokenNumerico() {
    const token = crypto.randomBytes(3).toString('hex').toUpperCase(); // Gerando um token de 6 caracteres hexadecimais
    return token; // Retornando o token gerado
}

// Função para enviar email com o token gerado
function enviarEmailCadastro(req, res) {
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

    const assunto = 'Redefinir senha';
    const conteudo = `<p>Utilize o seguinte token para redefinir sua senha::</p>
                        <h1>CÓDIGO</h1>
                        <p>
                            <h2>${token}</h2>
                        <p/>
                        `;

    const emailOptions = {
        from: 'samuel18tao@gmail.com', // Substitua pelo seu email
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
            res.json({ message: 'Email enviado com sucesso', token: token });
        }
    });
}

module.exports = enviarEmailCadastro;
