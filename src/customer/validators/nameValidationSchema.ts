import Joi from 'joi';

const NameValidationSchema = Joi.object().keys({
    Id: Joi.string().required().error(() => new Error('O ID do cliente precisa ser informado')),
    Name: Joi.string().required().min(5).error(() => new Error('Informe um nome válido para o cliente'))
});

export default NameValidationSchema;