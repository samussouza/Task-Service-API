const database = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

async function changePassword(req, res) {
    const { tokenUser, newPassword } = req.body;

    try {
        if (!tokenUser || !newPassword) {
            console.log("Token:", tokenUser);
            console.log("Senha:", newPassword);
            return res.status(400).json({ message: "Token ou nova senha não fornecidos!" });
            
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(tokenUser, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    return reject(new Error('Token inválido'));
                }
                resolve(decoded);
            });
        })

        const idUser = decoded.id;
        if (!idUser) {
            res.status(400).json({ message: "ID no usuário não encontrado no token!" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const query = "UPDATE usuario SET senha = ? WHERE id = ?;"
        const values = [hashedPassword, idUser];

        await new Promise((resolve, reject) => {
            database.query(query, values, (error, results) => {
                if (error) {
                    console.error("Erro ao realizar update da senha:", error.message);
                    return reject(new Error("Erro ao realizar update da senha!"));
                }
                resolve(results);
            });
        });
        res.status(201).json({ message: "Senha atualizada com sucesso!" });
        console.log("SQL update: ", database.format(query, values));

    } catch (error) {
        console.error("Erro ao processar a requisão de update de senha: ", error.message);
        res.status(500).json({ message: error.message });
    }

}

module.exports = changePassword;