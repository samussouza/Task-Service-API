const express = require('express');
const cors = require("cors");

const router = require('./src/routes/routes');


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Iniciando o servidor na porta 4000
app.listen(4000, () => {
    console.log('Inicializando o servidor na porta 4000...');
});

app.get('/', (req ,res) =>{
    res.send('Hello Word!')
})