const nodemailer = require('nodemailer');

require('dotenv').config();  // Para carregar variáveis de ambiente do arquivo .env

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Teste de conexão com o servidor de email
transporter.verify((error, success) => {
    if (error) {
        console.error('Erro na verificação de transporte:', error);
        console.error('Detalhes do erro:', error.stack); 
    } else {
        console.log('Transporte de email está pronto para enviar mensagens.');
    }
});

module.exports = transporter;