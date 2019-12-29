import Joi from 'joi';

const UserRegisterValidationSchema = Joi.object().keys({
    name: Joi.string().min(5).required().error(() => new Error('Informe um nome válido')),
    email: Joi.string().email().required().error(() => new Error('Informe um endereço de e-mail válido')),
    password: Joi.string().required().min(5).max(14).error(() => new Error('A senha deve conter entre 5 e 14 caratéres'))
});

export default UserRegisterValidationSchema;