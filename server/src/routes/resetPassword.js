
const express = require('express');
const router = express.Router();
const emailController = require('../services/emailService');

router.post('/resetPassword', emailController);

module.exports = router;