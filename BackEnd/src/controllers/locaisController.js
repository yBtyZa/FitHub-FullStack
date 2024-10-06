const Local = require('../models/Local');
const Usuario = require('../models/Usuario')


class ControllerLocais {
  async criarLocal(req, res) {
    try {
      const { nome, descricao, endereco, pratica_esportiva } = req.body;
      const userIdAutt = req.usuarioId //(colocado na requisição pelo validaToken)

      
      const local = await Local.create({
        nome,
        descricao,
        usuarioId: userIdAutt,
        pratica_esportiva,
        endereco: {
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          longitude: endereco.longitude,
          latitude: endereco.latitude
        }
      });
      return res.status(201).json(local);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Não foi possível criar o local', error });
    }
  }

  async deletaLocal(req, res) {
    try {
      const { id } = req.params;
      const userIdAutt = req.usuarioId //(colocado na requisição pelo validaToken)

      const local = await Local.findByPk(id);

      if (!local) {
        return res.status(404).json({ mensagem: 'Local não encontrado' });
      }

      if (local.usuarioId !== userIdAutt) {
        return res.status(403).json({ mensagem: 'Você não tem permissão para deletar este local' })
      }

      await local.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro ao excluir local' });
    }
  }

  async atualizaLocal(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, endereco, pratica_esportiva } = req.body;

      const userIdAutt = req.usuarioId //(colocado na requisição pelo validaToken)

      const local = await Local.findByPk(id);
      if (!local) {
        return res.status(404).json({ mensagem: 'Local não encontrado' });
      }

      if (local.usuarioId!== userIdAutt) {
        return res.status(403).json({ mensagem: 'Você não tem permissão para atualizar esse local' })
      }

      await local.update({
        nome,
        descricao,
        endereco: {
          cep: endereco.cep,
          numero: endereco.numero,
          complemento: endereco.complemento,
          logradouro: endereco.logradouro,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          longitude: endereco.longitude,
          latitude: endereco.latitude
        },
        pratica_esportiva
      });
      return res.status(200).json(local);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro ao atualizar local' });
    }
  }

  async listaLocalByUserId(req, res) {
    try {
      const { id } = req.params; // O parâmetro `id` refere ao `user_id`
      const locais = await Local.findAll({
        where: { usuarioId: id },
        attributes: [
          'usuarioId',
          'nome',
          'pratica_esportiva',
          'descricao',
          'endereco',
          'createdAt',
          'updatedAt',
        ]
      });

      if (!locais || locais.length === 0) {
        return res.status(404).json({ message: 'Locais não encontrados para o usuário fornecido!' });
      }

      return res.status(200).json(locais);
    } catch (error) {
      console.error('Erro ao buscar os locais:', error);
      return res.status(500).json({ error: 'Erro ao buscar os locais' });
    }
  }


  async listaTodosOsLocais(req, res) {
    try {
      const locais = await Local.findAll({
        attributes: ['id', 'nome', 'descricao', 'endereco', 'usuarioId', 'pratica_esportiva', 'createdAt', 'updatedAt'],
        include: [
          {
            model: Usuario, 
            as: 'usuario', 
            attributes: ['nome'] 
          }
        ]
      });
      return res.status(200).json(locais);
    } catch (error) {
      console.error('Error listing locations:', error);
      return res.status(500).json({ error: 'Erro ao listar locais: ' + error.message });
    }
  }
}


module.exports = new ControllerLocais();
