const express = require('express');
const { register, login, createUser } = require('../controllers/UserController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-user', protect, createUser)

module.exports = router;
