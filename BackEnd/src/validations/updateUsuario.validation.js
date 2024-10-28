const Yup = require('yup');

const updateUsuarioSchema = Yup.object().shape({
  nome: Yup.string()
    .required("Nome de usuário obrigatório")
    .max(30, "Nome de usuário muito grande")
    .min(5, "Nome de usuário muito pequeno"),
  email: Yup.string()
    .required("E-mail obrigatório")
    .email("E-mail inválido")
    .max(60, "E-mail muito grande")
    .min(5, "E-mail muito pequeno"),
  data_nascimento: Yup.string()
    .required("Data de nascimento obrigatória")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de Nascimento deve estar no formato dd/mm/aaaa'),
  sexo: Yup.string()
    .required("Sexo obrigatório"),
  password: Yup.string()
    .required("Senha obrigatória")
    .max(16, "Senha muito grande")
    .min(6, "Senha muito pequena"),


  endereco: Yup.object().shape({
    logradouro: Yup.string().required('O logradouro é obrigatório'),
    numero: Yup.string().required('O número é obrigatório'),
    bairro: Yup.string().required('O bairro é obrigatório'),
    cidade: Yup.string().required('A cidade é obrigatória'),
    estado: Yup.string().length(2, 'O estado deve ter 2 caracteres').required('O estado é obrigatório'),
    cep: Yup.string().matches(/^\d{5}-\d{3}$/, 'O CEP deve estar no formato xxxxx-xxx').required('O CEP é obrigatório'),
    complemento: Yup.string().nullable(), // campo opcional
  }).required('O endereço é obrigatório')
});

module.exports = { updateUsuarioSchema };