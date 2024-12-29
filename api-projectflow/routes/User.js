const express = require('express');
const { register, login, createUser, getUserProfile } = require('../controllers/UserController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-user', protect, createUser)
router.get('/profile', protect, getUserProfile )

module.exports = router;
