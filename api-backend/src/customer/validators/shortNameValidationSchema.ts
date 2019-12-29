import Joi from 'joi';

const ShortNameValidationSchema = Joi.object().keys({
    Id: Joi.string().required().error(() => new Error('O ID do cliente precisa ser informado')),
    ShortName: Joi.string().required().max(30).error(() => new Error('O nome abreviado precisa conter até 30 caractéres'))
});

export default ShortNameValidationSchema;