import Joi from 'joi';

const NewCustomerValidationSchema = Joi.object().keys({
    Name: Joi.string().required().min(5).error(() => new Error('Informe um nome válido para o cliente')),
    ShortName: Joi.string().required().max(30).error(() => new Error('O nome abreviado é obrigatório e precisa conter até 30 caractéres'))
});

export default NewCustomerValidationSchema;