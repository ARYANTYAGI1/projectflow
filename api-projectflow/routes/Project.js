const express = require('express');
const { addProject, updateProject, changeStatus } = require('../controllers/ProjectController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/add-project', protect, addProject);
router.post('/update-project', protect, updateProject);
router.post('/change-project-status/:id', protect, changeStatus);

module.exports = router;
