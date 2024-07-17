const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("./src/routes/usuario");
app.use('/usuario', userRouter);

const resestRouter = require("./src/routes/resetPassword");
app.use('/emailService', resestRouter);

const taskRouter = require("./src/routes/task");
app.use('/task', taskRouter);

// Iniciando o servidor na porta 4000
app.listen(4000, () => {
    console.log('Inicializando o servidor na porta 4000...');
});


