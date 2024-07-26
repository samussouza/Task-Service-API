// const connection = require('../database/connection');
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');


router.get('/validateUser', usuarioController.validateUser);

router.post('/registerUser', usuarioController.registerUser);

module.exports = router;
