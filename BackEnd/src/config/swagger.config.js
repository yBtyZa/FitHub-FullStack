const swaggerUsuarios = require('./swagger.usuarios.json');
const swaggerLocais = require('./swagger.locais.json');
const swaggerLogin = require('./swagger.login.json');

// Função para combinar os documentos
const mergeSwaggerDocs = (...docs) => {
    return docs.reduce((acc, doc) => {
        acc.paths = { ...acc.paths, ...doc.paths };
        acc.components = { ...acc.components, ...doc.components };
        return acc;
    }, {
        openapi: "3.0.0",
        info: {
            title: "API de Gestão Completa",
            version: "1.1.0",
            description: "Documentação da API para Usuários, Locais e Autenticação"
        },
        servers: [
            {
                url: `http://localhost:${process.env.APP_PORT}/api`
            }
        ],
        paths: {},
        components: {}
    });
};

const swaggerDocument = mergeSwaggerDocs(swaggerUsuarios, swaggerLocais, swaggerLogin);

module.exports = swaggerDocument;
