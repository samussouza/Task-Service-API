const express = require('express');
const cors = require("cors");


const app = express();

app.use(express.json());



var resetPasswordRouter = require("./src/routes/routes")

app.use(cors());

app.use('routes', resetPasswordRouter);


// Iniciando o servidor na porta 4000
app.listen(4000, () => {
    console.log('Inicializando o servidor na porta 4000...');
});

// app.get('/', (req ,res) =>{
//     res.send('Hello Word!')
// })