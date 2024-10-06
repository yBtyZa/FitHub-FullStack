const express = require("express");
const cors = require('cors');
const routes = require("./routes/routes");
const connection = require("./database/connection");
const APP_PORT = process.env.APP_PORT || 3000; 
require('./models/associations'); 

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

class Server {
    
    constructor(server = express()) {
        this.middlewares(server);
        this.database();
        server.use(routes);
        this.initializeServer(server);
    }

    async middlewares(server) {
        console.log("Executando os middlewares");
        server.use(cors()); // Habilita CORS
        server.use(express.json()); // Para parsear requisições JSON
        server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Configuração do Swagger
        console.log("Middlewares executados");
    }

    async database() {
        try {
            console.log("Conectando ao banco de dados");
            await connection.authenticate();
            console.log("Banco de dados conectado com sucesso!");
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados: ", error);
            process.exit(1); // Encerra o processo se não conseguir conectar
        }
    }

    async initializeServer(server) {
        server.listen(APP_PORT, () => {
            console.log(`Servidor rodando na porta ${APP_PORT}!`);  
        });
    }
}

// Exporta a classe Server para ser utilizada em outros arquivos
module.exports = { Server };
