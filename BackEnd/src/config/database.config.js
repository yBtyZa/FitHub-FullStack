const { config } = require('dotenv');
config({ path: '../.env'});

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    pool: {
        max: 20, // Número máximo de conexões simultâneas
        min: 0,  // Número mínimo de conexões no pool
        acquire: 30000, // Tempo máximo para adquirir uma conexão (em milissegundos)
        idle: 10000, // Tempo de inatividade após o qual a conexão é liberada
    },
}
