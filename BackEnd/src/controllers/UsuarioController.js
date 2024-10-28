const { usuarioSchema } = require('../validations/usuario.validation');
const { updateUsuarioSchema } = require('../validations/updateUsuario.validation');
const Usuario = require('../models/Usuario');
const Local = require('../models/Local');
const Endereco = require('../models/Endereco');  // Importa o modelo Endereço
const connection = require('../database/connection');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UsuarioController {

    async criarConta(request, response) {
        const { nome, email, password, cpf, sexo, data_nascimento, endereco } = request.body;

        // Inicia a transação
        const transaction = await connection.transaction();


        try {
            await usuarioSchema.validate(request.body, { abortEarly: false });

            // Verificar duplicidade de CPF
            const cpfExistente = await Usuario.findOne({ where: { cpf } });
            if (cpfExistente) {
                return response.status(400).json({ mensagem: 'CPF já cadastrado' });
            }
            // Verificar duplicidade de email
            const emailExistente = await Usuario.findOne({ where: { email } });
            if (emailExistente) {
                return response.status(400).json({ mensagem: 'Email já cadastrado' });
            }
            // Aqui converte a data de nascimento de dd/mm/aaaa para yyyy-mm-dd
        const [dia, mes, ano] = data_nascimento.split('/');
        const dataFormatada = `${ano}-${mes}-${dia}`; // Formato yyyy-mm-dd

            // Criar usuário
            const usuario = await Usuario.create({
                nome,
                email,
                password_hash: password,  // O hook cuidará da criptografia
                cpf,
                sexo,
                data_nascimento:dataFormatada,
            }, { transaction });  // Associando a criação ao contexto da transação

            // Criar endereço associado ao usuário
            const enderecoCriado = await Endereco.create({
                logradouro: endereco.logradouro,
                numero: endereco.numero,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado,
                cep: endereco.cep,
                complemento: endereco.complemento || "",  // Opcional
                usuarioId: usuario.id  // Associação com o usuário criado
            }, { transaction });  // Associando a criação ao contexto da transação

            // Comita a transação (confirma todas as operações)
            await transaction.commit();

            // Retorna os dados do usuário e endereço criados
            return response.status(201).json({
                mensagem: 'Usuario criado com sucesso',
            });

        } catch (error) {
            // Em caso de erro, faz rollback da transação
            await transaction.rollback();

            // Se o erro for de validação do Yup
            if (error.name === 'ValidationError') {
                return response.status(400).json({ mensagem: error.errors });
            }

            console.error(error);
            return response.status(500).json({ mensagem: 'Erro ao criar usuário' });
        }
    }

    // Função para deletar um usuário (verificando locais associados)
    async deleteUsuario(req, res) {
        try {
            const { id } = req.params;

            // Inclui os locais associados no usuário
            const usuario = await Usuario.findByPk(id, {
                include: [{ model: Local, as: 'locais' }, { model: Endereco, as: 'endereco' }] // Inclui também os endereços
            });

            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            // Verifica se o usuário tem locais associados
            if (usuario.locais && usuario.locais.length > 0) {
                return res.status(400).json({ mensagem: 'Não é possível excluir um usuário com locais associados.' });
            }

            // Deleta o usuário e o endereço associado
            await Endereco.destroy({ where: { usuarioId: usuario.id } });  // Exclui o endereço associado
            await usuario.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao excluir usuário' });
        }
    }

    // Função para atualizar um usuário existente
    async updateUsuario(req, res) {
        // Inicia a transação
        const transaction = await connection.transaction();

        try {
            const { id } = req.params;  // Pega o ID do usuário dos parâmetros da URL
            const { email, endereco, data_nascimento, ...novosDados } = req.body;

            // Encontra o usuário pelo ID
            const usuario = await Usuario.findByPk(id, { transaction });
            if (!usuario) {
                await transaction.rollback();
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            //Somente o usuário que criou pode atualizá-lo
            const userIdAutt = req.usuarioId //(colocado na requisição pelo validaToken)
            if (usuario.id !== userIdAutt) {
                return res.status(403).json({ mensagem: 'Você não tem permissão para atualizar esse cadastro' })
              }


            await updateUsuarioSchema.validate(req.body, { abortEarly: false });

            // Verificar duplicidade de email
            const emailExistente = await Usuario.findOne({ where: { email, id: { [Op.ne]: id } } });
            if (emailExistente) {
                return res.status(400).json({ mensagem: 'Email já cadastrado por outro usuário' });
            } else {
                novosDados.email = email;
            }

            // Converte a data de nascimento para o formato YYYY-MM-DD se estiver presente
            if (data_nascimento) {
            const [dia, mes, ano] = data_nascimento.split('/');
            const dataFormatada = `${ano}-${mes}-${dia}`;
            novosDados.data_nascimento = dataFormatada;
            }

            // Compara senha enviada com a senha existente
            const passwordCompare = await bcrypt.compare(req.body.password, usuario.password_hash); 
            if (!passwordCompare) {
                return res.status(400).json({ mensagem: 'Senha inválida' });
            }          

            // Atualiza o usuário com os novos dados
            await usuario.update(novosDados, { transaction });

            //Atualização do endereço
            const enderecoExistente = await Endereco.findOne({ where: { usuarioId: id }, transaction });
            await enderecoExistente.update(endereco, { transaction });


            // Comita a transação (confirma todas as operações)
            await transaction.commit();

            return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
        } catch (error) {
            await transaction.rollback();

            if(error.name === "SequelizeUniqueConstraintError" ){
                return res.status(400).json({ mensagem: 'Email já cadastrado por outro usuário' });
            }

            // Se o erro for de validação do Yup
            if (error.name === 'ValidationError') {
                return res.status(400).json({ mensagem: error.errors });
            }
            console.error(error.code);

            return res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
        }
    }


    // Função para buscar um usuário por ID
    async getUsuarioById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id, {
                attributes: { exclude: ['password_hash'] },  // Exclui o campo de senha
                include: [{ model: Endereco, as: 'endereco' }]  // Inclui o endereço associado
            });
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            //Somente o usuário que criou pode atualizá-lo
            const userIdAutt = req.usuarioId //(colocado na requisição pelo validaToken)
            if (usuario.id !== userIdAutt) {
                return res.status(403).json({ mensagem: 'Você não tem permissão para acessar esse cadastro' })
              }


            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar o usuário' });
        }
    }

    // Função para listar todos os usuários com paginação
    async getAllUsuarios(req, res) {
        try {
            const usuarios = await Usuario.findAll({
                // Inclui apenas os campos desejados
                attributes: ['nome', 'sexo', 'email', 'ativo'], // Seleciona somente os campos permitidos
                include: [{
                    model: Endereco,
                    as: 'endereco',
                    attributes: ['cidade', 'estado'], // Inclui campos permitidos de endereço
                }]
            })
            if (usuarios.length === 0) {
                return res.status(200).json({ mensagem: 'Nenhum usuário cadastrado.' }); 
            }

            res.status(200).json(usuarios)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }

    // Função para listar todos os usuários ativos
    async getAllUsuariosAtivos(req, res) {
        try {
            const usuariosAtivos = await Usuario.findAll({
                where: { ativo: true },  // Filtra apenas os usuários ativos
                attributes: ['id','nome'],  
            });

            if (usuariosAtivos.length === 0) {
                return res.status(200).json({ mensagem: 'Nenhum usuário ativo.' }); 
            }
            return res.status(200).json(usuariosAtivos);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar usuários ativos' });
        }
    }
}

module.exports = new UsuarioController();