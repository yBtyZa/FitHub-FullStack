const Usuario = require('./Usuario');
const Local = require('./Local');
const Endereco = require('./Endereco');

// Associação: Um usuário pode ter vários locais
Usuario.hasMany(Local, { foreignKey: 'usuarioId', as: 'locais' });
Local.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// Associação: Um usuário pode ter um único endereço
Usuario.hasOne(Endereco, { as: 'endereco', foreignKey: 'usuarioId' });
Endereco.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = { Usuario, Local, Endereco };

