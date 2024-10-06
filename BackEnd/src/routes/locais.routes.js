const express = require('express');
const router = express.Router();
const locaisController = require('../controllers/locaisController');
const validaToken = require('../middlewares/validaToken.js');
const { validarLocal } = require('../validations/locais.validation.js'); 

router.post('/locais', validaToken, validarLocal, locaisController.criarLocal);
router.get('/locais', locaisController.listaTodosOsLocais);
router.get('/locais/:id', locaisController.listaLocalByUserId);
router.put('/locais/:id', validaToken, validarLocal, locaisController.atualizaLocal);
router.delete('/locais/:id', validaToken, locaisController.deletaLocal);

module.exports = router;
