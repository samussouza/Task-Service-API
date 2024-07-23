const mysql = require('mysql2');

// Crie a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'userAPI',
    password: 'sptech100',
    database: 'tarefas'
});

// Conecte ao banco de dados
connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

module.exports = connection;
