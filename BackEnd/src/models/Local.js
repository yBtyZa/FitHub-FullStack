const connection = require('../database/connection')
const { DataTypes } = require('sequelize')

const Locais = connection.define('locais', {
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
  },
  pratica_esportiva: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  endereco: {
    type: DataTypes.JSON,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
},
{
  paranoid: true,
  timestamps: true
})

module.exports = Locais