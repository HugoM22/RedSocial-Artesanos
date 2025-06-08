const express = require('express');
const router = express.Router();
const imagenController = require('../controllers/imagenController');
const authMiddleware = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/upload');

//subir imagen a un album
router.post(
    '/:albumId/imagen',
    authMiddleware,
    uploadMiddleware.single('archivo'),
    imagenController.subir
);

module.exports =router;