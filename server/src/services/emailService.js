const nodemailer = require('nodemailer');

//Abertura do serviço de transporte para enviar email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'samuel18tao@gmail.com',
        pass: 'jcjy jrgj qbnd afsa'
    }
});

module.exports 