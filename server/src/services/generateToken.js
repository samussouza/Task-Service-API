const jwt = require('jsonwebtoken');

// Função para gerar um token jwt seguro;
function gerarToken(userId) {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return token;
}

module.exports = gerarToken