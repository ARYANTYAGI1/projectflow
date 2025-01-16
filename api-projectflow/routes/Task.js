const express = require('express');
const { addTask, updateTask, getTaskList } = require('../controllers/TaskController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/add-task', protect, addTask);
router.post('/update-task', protect, updateTask);
router.get('/task-list', protect, getTaskList);

module.exports = router;
