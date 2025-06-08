const express = require('express');
const router =express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/auth');

// ver perfil publico de un usario
router.get('/:id',)