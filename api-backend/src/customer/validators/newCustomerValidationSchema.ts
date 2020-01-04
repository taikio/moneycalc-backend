import Joi from 'joi';

const NewCustomerValidationSchema = Joi.object().keys({
    name: Joi.string().required().min(5).error(() => new Error('Informe um nome válido para o cliente')),
    shortName: Joi.string().required().max(30).error(() => new Error('O nome abreviado é obrigatório e precisa conter até 30 caractéres')),
    // cpf: Joi.string().length(11).error(() => new Error('Informe um CPF válido para o cliente')),
    // email: Joi.string()
});

export default NewCustomerValidationSchema;