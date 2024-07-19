const database = require('../database/connection');

function validateUser(req, res) {
    const { userName, userPassword } = req.body;

    console.log(userName, userPassword);

    const query = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    const values = [userName, userPassword];

    database.query(query, values, (error, results) => {
        if (error) {
            console.error('Erro ao validar usuário:', error);
            res.status(500).json({ error: 'Erro ao validar usuário' });
            return;
        } else if (results.length > 0) {
            console.log('Usuário encontrado:', results);
            res.json({ message: 'Usuário validado com sucesso', user: results[0] });
        } else {
            console.log('Usuário não encontrado');
            res.status(401).json({ message: 'Usuário não encontrado ou senha incorreta' });
        }
    });
}

function registerUser(req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).send("Todos os campos são obrigatórios");
    }
    const checkUser = "SELECT * FROM usuario WHERE email = ?";
    database.query(checkUser, [email], (checkError, checkResults) => {
        if (checkError) {
            console.error("Erro na consulta do usuário:", checkError);
            return res.status(500).json({ error: "Erro ao verificar o usuário" });
        } else if (checkResults.length > 0) {
            return res.status(409).json({ message: "Email já cadastrado" });
        } else {
            const query = "INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)";
            const values = [nome, email, senha];
            database.query(query, values, (error, results) => {
                if (error) {
                    console.error("Erro ao registrar o usuário:", error);
                    return res.status(500).json({ error: "Erro ao registrar o usuário" });
                }
                console.log('Usuário registrado:', results);
                console.log('SQL inserido:', database.format(query, values));
                res.status(201).json({ message: 'Usuário registrado com sucesso' });
            });
        }
    });
}

module.exports = {
    validateUser,
    registerUser
}
