const express = require('express');
const router = express.Router();
const taskController = require("../controllers/taskController2");

router.post('/newTask', taskController.newTask);

router.get('/listTask/:userId', taskController.listTask);

router.post('/deleteTask', taskController.deleteTask )

module.exports = router;