const express = require('express');
const { addProject, updateProject, changeStatus, getProjectDetail, getProjectList, getProjects } = require('../controllers/ProjectController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/add-project', protect, addProject);
router.put('/update-project/:id', protect, updateProject);
router.post('/change-project-status/:id', protect, changeStatus);
router.get('/list', protect, getProjectList);
router.get('/detail/:id', protect, getProjectDetail);
router.get('/projects', protect, getProjects);

module.exports = router;
