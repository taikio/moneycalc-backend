import Joi from 'joi';

const ValueValidationSchema = Joi.object().keys({
    Value: Joi.number().required().greater(0).error(() => new Error('O valor deve ser maior que 0')),
    Id: Joi.string().required().error(() => new Error('O ID do lançamento financeiro precisa ser informado')),
});

export default ValueValidationSchema;