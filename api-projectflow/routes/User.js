const express = require('express');
const { register, login, createUser, getUserProfile, getUsersList } = require('../controllers/UserController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-user', protect, createUser)
router.get('/profile', protect, getUserProfile)
router.get('/list', protect, getUsersList)

module.exports = router;
