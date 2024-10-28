const { config } = require('dotenv');
config();  // Carrega as variáveis de ambiente do .env

const isDocker = process.env.NODE_AMBIENTE === 'docker';

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,  // Porta padrão do PostgreSQL
    pool: {
        max: 20, // Número máximo de conexões simultâneas
        min: 0,  // Número mínimo de conexões no pool
        acquire: 30000, // Tempo máximo para adquirir uma conexão (em milissegundos)
        idle: 10000, // Tempo de inatividade após o qual a conexão é liberada
    },
    dialectOptions: {
        ssl: !isDocker ? {
            require: true,      // Exige SSL apenas em ambientes que não são Docker
            rejectUnauthorized: false // Isso desabilita a verificação do certificado, se necessário
        } : null
    }
}
