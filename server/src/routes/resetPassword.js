
const express = require('express');
const router = express.Router();
const emailController = require('../services/emailService');
// const resetPasswordController = require('../controllers/resetPasswordController');

router.post('/resetPassword', emailController);

// router.post('/changePassword', resetPasswordController)

module.exports = router;