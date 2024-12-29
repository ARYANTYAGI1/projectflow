const express = require('express');
const { addTask, updateTask, taskList } = require('../controllers/TaskController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/add-task', protect, addTask);
router.post('/update-task', protect, updateTask);
router.get('/list', protect, taskList);

module.exports = router;
