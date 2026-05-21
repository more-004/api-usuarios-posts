const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Definición de las rutas del CRUD de usuarios
router.get('/', usuariosController.obtenerUsuarios);
router.post('/', usuariosController.crearUsuario);
router.get('/:id', usuariosController.obtenerUsuarioPorId);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;