const database = require("../database/connection");

function newTask(req, res) {
    const { title, category, notes, id } = req.body;

    if (!title, !category, !notes, !id) {
        res.status(404).send("Campo inválidos");
    }

    const insert = "INSERT INTO tarefas (titulo, categoria, anotacoes, fk_user) VALUES (?, ?, ?, ?)";;
    const values = [title, category, notes, id];

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

    const query = "SELECT * FROM tarefas WHERE fk_user = ?";
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

module.exports = {
    newTask,
    listTask
};