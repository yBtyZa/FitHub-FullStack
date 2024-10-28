const express = require("express");
const cors = require('cors');
require('dotenv').config();  // Carrega o arquivo .env
const routes = require("./routes/routes");
const connection = require("./database/connection");
const APP_PORT = process.env.APP_PORT || 3000;
require('./models/associations');  // Associações entre os models

// Swagger-related imports
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.config');  // Carrega o Swagger centralizado

class Server {
    
    constructor(server = express()) {
        this.middlewares(server);
        this.database();
        server.use(routes);  // Define as rotas
        this.initializeServer(server);  // Inicializa o servidor
    }

    async middlewares(server) {
        server.use(cors());
        server.use(express.json());
        
        // Configuração do Swagger
        server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    async database() {
        try {
            await connection.authenticate();
            console.log("Banco de dados conectado com sucesso!");
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error);
            process.exit(1);
        }
    }

    async initializeServer(server) {
        server.listen(APP_PORT, () => {
            console.log(`Servidor rodando na porta ${APP_PORT}!`);
        });
    }
}

module.exports = { Server };
