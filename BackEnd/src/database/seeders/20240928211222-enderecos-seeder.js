'use strict';

const usuariosEnderecos = [
  {
    usuarioId: 1, // Relacionado ao Carlos Silva
    cep: '88015-000',
    logradouro: 'Rua Felipe Schmidt',
    numero: '123',
    bairro: 'Centro',
    cidade: 'Florianópolis',
    estado: 'SC',
    complemento: '', 
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    usuarioId: 2, // Relacionado à Ana Paula
    cep: '88020-100',
    logradouro: 'Rua Bocaiúva',
    numero: '456',
    bairro: 'Centro',
    cidade: 'Florianópolis',
    estado: 'SC',
    complemento: '', 
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    usuarioId: 3, // Relacionado ao Roberto Carlos
    cep: '88030-200',
    logradouro: 'Avenida Beira Mar Norte',
    numero: '789',
    bairro: 'Beira Mar',
    cidade: 'Florianópolis',
    estado: 'SC',
    complemento: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    usuarioId: 4, // Relacionado à Fernanda Souza
    cep: '88040-300',
    logradouro: 'Rua Jornalista Assis Chateaubriand',
    numero: '101',
    bairro: 'Córrego Grande',
    cidade: 'Florianópolis',
    estado: 'SC',
    complemento: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    usuarioId: 5, // Relacionado ao João Ferreira
    cep: '88050-400',
    logradouro: 'Rua Lauro Linhares',
    numero: '202',
    bairro: 'Trindade',
    cidade: 'Florianópolis',
    estado: 'SC',
    complemento: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('enderecos', usuariosEnderecos);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('enderecos', null, {});
  }
};
