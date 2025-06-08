const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middlewares/auth');

//Alternar amistad
router.post('/:id/alternar', authMiddleware, friendController.alternarAmistad);

module.exports = router;
