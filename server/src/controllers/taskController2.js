const database = require("../database/connection");

function newTask(req, res) {
    const { title, category, notes, id , date} = req.body;

    if (!title, !category, !notes, !id, !date) {
        res.status(404).send("Campos inválidos");
    }

    const insert = "INSERT INTO tarefas (titulo, categoria, anotacoes, data, fk_user) VALUES (?, ?, ?, ?, ?)";;
    const values = [title, category, notes, date, id];

    database.query(insert, values, (error, results) => {
        if (results) {
            console.log("Tarefa criada com sucesso: ", results)
            res.status(201).json({ message: "Tarefa criada com sucesso!", task: results[0] })
            console.log('SQL inserido:', database.format(insert, values));
        } else {
            console.error("Erro ao criar nova tarefa:", error)
            res.status(500).json({ error: "Erro ao inserir nova tarefa" })
        }
    })
}

function listTask(req, res) {
    const id = req.params.userId;

    const query = "SELECT * FROM tarefas WHERE fk_user = ?;";
    const value = [id];

    database.query(query, value ,(error, results) => {
        if (error){
            console.error("Erro ao listar as tarefas: ", error);
            res.status(500).json({error: "Erro ao listar as tarefas"});
        } else {
            console.log('Tarefas listadas com sucesso:', results);
            res.json({ message: 'Tarefas listadas com sucesso: ', task: results });
        }
    });
}

function deleteTask(req, res) {
    const { idTask, idUser } = req.body;

    // Primeiro, excluimos a tarefa
    const deleteQuery = "DELETE FROM tarefas WHERE id = ? AND fk_user = ?";
    const deleteValues = [idTask, idUser];

    database.query(deleteQuery, deleteValues, (error, results) => {
        if (error) {
            console.error("Erro ao deletar tarefa: ", error);
            return res.status(500).json({ error: "Erro ao deletar tarefa" });
        } 

        if (results.affectedRows === 0) {
            // Nenhuma tarefa encontrada para deletar
            console.log('Nenhuma tarefa encontrada para deletar');
            return res.status(404).json({ message: 'Nenhuma tarefa encontrada para deletar' });
        }

        // Após a exclusão, redefine o AUTO_INCREMENT
        const alterQuery = "ALTER TABLE tarefas AUTO_INCREMENT = 1";
        
        database.query(alterQuery, (error) => {
            if (error) {
                console.error("Erro ao redefinir AUTO_INCREMENT: ", error);
                return res.status(500).json({ error: "Erro ao redefinir AUTO_INCREMENT" });
            }

            console.log('Tarefa deletada e AUTO_INCREMENT redefinido com sucesso');
            res.json({ message: 'Tarefa deletada com sucesso' });
        });
    });
}

module.exports = {
    newTask,
    listTask,
    deleteTask
};