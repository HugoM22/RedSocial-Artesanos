const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/auth');

// ver perfil publico de un usario
router.get('/:id',usuarioController.verPerfil);

//formulario de edicion de tu perfil
router.get('/:id/editar',authMiddleware,usuarioController.editarForm);

//actualizacion de tu perfil
router.post('/:id/editar',authMiddleware,usuarioController.actualizar);

module.exports = router;