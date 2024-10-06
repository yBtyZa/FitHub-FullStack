const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');
const validaToken = require('../middlewares/validaToken');


router.post('/usuarios', usuarioController.criarConta);
router.get('/usuarios', validaToken, usuarioController.getAllUsuarios);
router.get('/usuarios/ativos', validaToken, usuarioController.getAllUsuariosAtivos);
router.get('/usuarios/:id', validaToken, usuarioController.getUsuarioById);
router.put('/usuarios/:id', validaToken, usuarioController.updateUsuario);
router.delete('/usuarios/:id', validaToken, usuarioController.deleteUsuario);


module.exports = router;
