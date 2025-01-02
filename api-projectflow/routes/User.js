const express = require('express');
const { register, login, createUser, getUserProfile, getUsersList, resetCodeEmail, verifyResetCode, resetPassword, changeStatus, changePassword } = require('../controllers/UserController');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-user', protect, createUser)
router.get('/profile', protect, getUserProfile)
router.get('/list', protect, getUsersList)
router.put('/reset-code', resetCodeEmail)
router.put('/verify-code', verifyResetCode )
router.put('/reset-password', resetPassword)
router.put('/change-status', protect, changeStatus)
router.put('/password-change', protect, changePassword);

module.exports = router;
