import Joi from 'joi';

const EmailValidationSchema = Joi.object().keys({
    id: Joi.string().required().error(() => new Error('O ID do cliente precisa ser informado')),
    email: Joi.string().required().email().error(() => new Error('Informe um e-mail válido para o cliente'))
});

export default EmailValidationSchema;