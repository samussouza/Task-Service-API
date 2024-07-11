const database = require('../database/connection');

class TaskController {
    novaTarefa(req, res) {
        const { userName, userPassword } = req.body;

        console.log(userName, userPassword);

        const query = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
        const values = [userName, userPassword];

        database.query(query, values, (error, results) => {
            if (error) {
                console.error('Erro ao validar usuário:', error);
                res.status(500).json({ error: 'Erro ao validar usuário' });
                return;
            }

            if (results.length > 0) {
                console.log('Usuário encontrado:', results);
                res.json({ message: 'Usuário validado com sucesso', user: results[0] });
            } else {
                console.log('Usuário não encontrado');
                res.status(401).json({ message: 'Usuário não encontrado ou senha incorreta' });
            }
        });
    }
}

module.exports = new TaskController();
