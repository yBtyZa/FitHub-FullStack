'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('locais', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuarioId: {  // Ajuste feito de user_id para usuarioId
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',  // Garantir consistência na alteração do ID do usuário
        onDelete: 'SET NULL'  // Garantir que ao deletar o usuário, o campo fique como null em locais
      },
      nome: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      pratica_esportiva: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
      },
      endereco: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    }, {
      timestamps: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('locais');
  }
};

