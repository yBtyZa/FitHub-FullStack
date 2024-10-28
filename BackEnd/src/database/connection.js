const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database.config');  // Carrega a configuração do banco de dados

// Cria a conexão com o banco de dados usando as configurações do .env
const connection = new Sequelize(databaseConfig);

module.exports = connection;
