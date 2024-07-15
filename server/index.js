const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const routesServer = require("./src/routes/usuario");
app.use('/usuario', routesServer);

const resestRouter = require("./src/routes/resetPassword");
app.use('/emailService', resestRouter);


// Iniciando o servidor na porta 4000
app.listen(4000, () => {
    console.log('Inicializando o servidor na porta 4000...');
});


