const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const loginSchema = require('../validations/login.validation');
const JWT_SECRET = process.env.JWT_SECRET

class AuthService {
  async login(req, res) { // POST
    try {
      await loginSchema.validate(req.body);
      const { email, password } = req.body;

      // Busca o usuário por e-mail
      const user = await Usuario.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      // Compara a senha fornecida com o hash do banco de dados
      const isIgual = await bcrypt.compare(password, user.password_hash);
      if (!isIgual) {
        return res.status(401).json({ message: 'E-mail ou senha incorreta' });
      }

      // Atualiza o status do usuario para ativo
      const userUpdate = await user.update({ ativo: true });

      // Gera o token
      const token = jwt.sign({ id: user.id, user_name: user.nome }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      const user_id = req.usuarioId;

      const user = await Usuario.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Atualiza o status do usuario para inativo
      const userUpdate = await user.update({ ativo: false });

      return res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthService();
