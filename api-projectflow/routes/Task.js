const express = require('express');
const { addTask, updateTask, getTaskList, taskDetail, deleteTask } = require('../controllers/TaskController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/add-task', protect, addTask);
router.put('/update-task/:id', protect, updateTask);
router.get('/task-list', protect, getTaskList);
router.get('/detail/:id', protect, taskDetail);
router.delete('/remove/:id', protect, deleteTask)


module.exports = router;
