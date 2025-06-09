const express =require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//login
router.get('/login',authController.formLogin);
router.post('/login',authController.login);

//registro
router.get('/registrar',authController.formRegistrar);
router.post('/registrar', authController.registrar);

//logout
router.get('/logout',authController.logout);

module.exports = router;