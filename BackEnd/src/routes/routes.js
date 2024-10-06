const express = require('express');
const router = express.Router();
const autenticacaoRoutes = require('./auth.routes');
const usuariosRoutes = require('./usuarios.routes');
const locaisRoutes = require('./locais.routes');

router.use('/api', autenticacaoRoutes); 
router.use('/api', usuariosRoutes);
router.use('/api', locaisRoutes); 

module.exports = router;
