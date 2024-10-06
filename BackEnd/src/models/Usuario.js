//by: LHProvin
const { DataTypes } = require("sequelize");
const { hashSync } = require('bcryptjs');
const connection = require("../database/connection");



const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        unique: true,
        allowNull: false
    },
    sexo: {
        type: DataTypes.ENUM('masculino', 'feminino', 'outro'),
        allowNull: true
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    paranoid: true  // soft delete
});

// Hook para criptografar a senha antes de salvar o usuário
Usuario.beforeSave((usuario) => {
    if (usuario.changed('password_hash')) {
        usuario.password_hash = hashSync(usuario.password_hash, 10);
    }
    return usuario;
});


module.exports = Usuario;