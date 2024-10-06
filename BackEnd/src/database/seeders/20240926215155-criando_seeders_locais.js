'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('locais', [
      {
        usuarioId: 1,  // Substitua pelo ID correto do usuário
        nome: 'Parque da Luz',
        pratica_esportiva: 'Caminhada',
        descricao: 'Um ótimo lugar para uma caminhada tranquila em meio à natureza.',
        endereco: JSON.stringify ({
          cep: '88010-150',
          numero: null,
          complemento: null,
          logradouro: 'R. Felipe Schmidt',
          bairro: 'Centro',
          cidade: 'Florianópolis',
          estado: 'SC',
          latitude: -27.492280,
          longitude: -48.560207
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        usuarioId: 2,  // Substitua pelo ID correto do usuário
        nome: 'Academia Fit',
        pratica_esportiva: 'Musculação',
        descricao: 'Academia equipada com aparelhos modernos para musculação.',
        endereco: JSON.stringify({
          cep: '88015-601',
          numero: '1280',
          complemento: null,
          logradouro: 'Av. Jorn. Rubéns de Arruda Ramos',
          bairro: 'Centro',
          cidade: 'Florianópolis',
          estado: 'SC',
          latitude: -27.5885415,
          longitude: -48.5573464
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        usuarioId: 3,  // Substitua pelo ID correto do usuário
        nome: 'Praça XV de Novembro',
        pratica_esportiva: 'Caminhada',
        descricao: 'Praça histórica localizada no coração de Florianópolis, ideal para caminhadas.',
        endereco: JSON.stringify({
          cep: '88010-400',
          numero: null,
          complemento: null,
          logradouro: 'Praça XV de Novembro',
          bairro: 'Centro',
          cidade: 'Florianópolis',
          estado: 'SC',
          latitude: -27.5958,
          longitude: -48.5487
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        usuarioId: 4,  // Substitua pelo ID correto do usuário
        nome: 'Lagoa da Conceição',
        pratica_esportiva: 'Caminhada',
        descricao: 'Área popular com trilhas ao redor da bela Lagoa da Conceição.',
        endereco: JSON.stringify({
          cep: '88062-200',
          numero: null,
          complemento: null,
          logradouro: 'Lagoa da Conceição',
          bairro: 'Lagoa da Conceição',
          cidade: 'Florianópolis',
          estado: 'SC',
          latitude: -27.5958,
          longitude: -48.4487
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        usuarioId: 5,  // Substitua pelo ID correto do usuário
        nome: 'Ponte Hercílio Luz',
        pratica_esportiva: 'Caminhada',
        descricao: 'A icônica Ponte Hercílio Luz, símbolo de Florianópolis, perfeita para caminhadas.',
        endereco: JSON.stringify({
          cep: '88015-120',
          numero: null,
          complemento: null,
          logradouro: 'Av. Hercílio Luz',
          bairro: 'Centro',
          cidade: 'Florianópolis',
          estado: 'SC',
          latitude: -27.5958,
          longitude: -48.5487
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locais', null, {});
  }
};
