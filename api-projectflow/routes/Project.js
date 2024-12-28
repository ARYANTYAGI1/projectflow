const express = require('express');
const { addProject, updateProject, changeStatus, getProjects, getProjectDetail } = require('../controllers/ProjectController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/add-project', protect, addProject);
router.post('/update-project', protect, updateProject);
router.post('/change-project-status/:id', protect, changeStatus);
router.get('/list', protect, getProjects);
router.get('/detail/:id', protect, getProjectDetail);

module.exports = router;
