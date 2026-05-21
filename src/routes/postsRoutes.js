const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// Definición de las rutas del CRUD de posts
router.get('/', postsController.obtenerPosts);
router.post('/', postsController.crearPost);
router.get('/:id', postsController.obtenerPostPorId);
router.put('/:id', postsController.actualizarPost);
router.delete('/:id', postsController.eliminarPost);

module.exports = router;