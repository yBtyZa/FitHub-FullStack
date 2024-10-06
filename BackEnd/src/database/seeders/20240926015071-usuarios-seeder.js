'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = bcrypt.hashSync('12345678', 10); // Criptografar a senha do Carlos Silva
    const hashedPassword2 = bcrypt.hashSync('12345678', 10); // Criptografar a senha da Ana Paula
    const hashedPassword3 = bcrypt.hashSync('12345678', 10); // Criptografar a senha do Roberto Carlos
    const hashedPassword4 = bcrypt.hashSync('12345678', 10); // Criptografar a senha da Fernanda Souza
    const hashedPassword5 = bcrypt.hashSync('12345678', 10); // Criptografar a senha do João Ferreira

    return queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Carlos Silva',
        email: 'carlos.silva@email.com',
        password_hash: hashedPassword1,
        cpf: '123.456.789-10',
        sexo: 'masculino',
        data_nascimento: '1985-10-10',  // Formato YYYY-MM-DD
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Ana Paula',
        email: 'ana.paula@email.com',
        password_hash: hashedPassword2,
        cpf: '987.654.321-10',
        sexo: 'feminino',
        data_nascimento: '1990-07-05',  // Formato YYYY-MM-DD
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Roberto Carlos',
        email: 'roberto.carlos@email.com',
        password_hash: hashedPassword3,
        cpf: '111.222.333-44',
        sexo: 'masculino',
        data_nascimento: '1978-12-15',  // Formato YYYY-MM-DD
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Fernanda Souza',
        email: 'fernanda.souza@email.com',
        password_hash: hashedPassword4,
        cpf: '222.333.444-55',
        sexo: 'feminino',
        data_nascimento: '1988-05-23',  // Formato YYYY-MM-DD
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'João Ferreira',
        email: 'joao.ferreira@email.com',
        password_hash: hashedPassword5,
        cpf: '333.444.555-66',
        sexo: 'masculino',
        data_nascimento: '1995-03-12',  // Formato YYYY-MM-DD
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
