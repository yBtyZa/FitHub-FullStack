const yup = require('yup');

const validarLocal = async (req, res, next) => {
  const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    descricao: yup.string().nullable(),
    pratica_esportiva: yup.string().required('Prática esportiva é obrigatória'),
    //user_id: yup.number().positive().required('User ID é obrigatório'),
    endereco: yup.object().shape({
      cep: yup.string().matches(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 12345-678').required('CEP é obrigatório'),
      numero: yup.string().nullable(),
      complemento: yup.string().nullable(),
      logradouro: yup.string().required('Logradouro é obrigatório'),
      //bairro: yup.string().required('Bairro é obrigatório'),
      cidade: yup.string().required('Cidade é obrigatória'),
      estado: yup.string().length(2, 'Estado deve ter 2 caracteres').required('Estado é obrigatório'),
      longitude: yup.number().min(-180).max(180).required('Longitude é obrigatória'),
      latitude: yup.number().min(-90).max(90).required('Latitude é obrigatória')
    })
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

module.exports = { validarLocal };