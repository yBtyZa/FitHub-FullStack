const express = require('express');
const router = express.Router();
const autenticacaoRoutes = require('./auth.routes');
const usuariosRoutes = require('./usuarios.routes');
const locaisRoutes = require('./locais.routes');

// Swagger imports
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.config.js');  // Carrega o arquivo único

// Definir as rotas da API
router.use('/api', autenticacaoRoutes);
router.use('/api', usuariosRoutes);
router.use('/api', locaisRoutes);

// Rota para a documentação do Swagger
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;