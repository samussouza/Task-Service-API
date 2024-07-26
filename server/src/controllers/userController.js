const database = require('../database/connection');
const bcrypt = require('bcrypt');

async function validateUser(req, res) {
    const email = req.query.email;
    const password = req.query.password;

    const selectQuery = 'SELECT * FROM usuario WHERE email = ?';
    const valueSelect = [email];

    try {
        database.query(selectQuery, valueSelect, async (error, results) => {
            if (error) {
                console.error('Erro ao validar usuário:', error);
                return res.status(500).json({ error: 'Erro ao validar usuário' });
            }
            if (results.length > 0) {
                const user = results[0];
                // Comparar a senha fornecida com o hash armazenado
                const isMatch = await bcrypt.compare(password, user.senha);

                if (isMatch) {
                    console.log('Usuário encontrado:', results);
                    res.json({ message: 'Usuário validado com sucesso', user });
                } else {
                    console.log('Senha incorreta');
                    res.status(401).json({ message: 'Senha incorreta' });
                }
            } else {
                console.log('Usuário não encontrado');
                res.status(401).json({ message: 'Usuário não encontrado ' });
            }
        });
    } catch (error) {
        console.error('Erro ao processar a requisição de validação de usuário:', error.message);
        res.status(500).json({ message: error.message });
    }
}

async function registerUser(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send("Todos os campos são obrigatórios");
    }

    const checkUser = "SELECT * FROM usuario WHERE email = ?";
    database.query(checkUser, [email], async (checkError, checkResults) => {
        if (checkError) {
            console.error("Erro na consulta do usuário:", checkError);
            return res.status(500).json({ error: "Erro ao verificar o usuário" });
        } else if (checkResults.length > 0) {
            return res.status(409).json({ message: "Email já cadastrado" });
        } else {
            try {
                // Hash da senha antes de armazenar
                const hashedPassword = await bcrypt.hash(senha, 10);
                const query = "INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)";
                const values = [nome, email, hashedPassword];

                database.query(query, values, (error, results) => {
                    if (error) {
                        console.error("Erro ao registrar o usuário:", error);
                        return res.status(500).json({ error: "Erro ao registrar o usuário" });
                    }
                    console.log('Usuário registrado:', results);
                    console.log('SQL inserido:', database.format(query, values));
                    res.status(201).json({ message: 'Usuário registrado com sucesso' });
                });
            } catch (hashError) {
                console.error("Erro ao gerar o hash da senha:", hashError);
                res.status(500).json({ error: "Erro ao gerar o hash da senha" });
            }
        }
    });
}

module.exports = {
    validateUser,
    registerUser
}
