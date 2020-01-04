import Joi from 'joi';

const ValueValidationSchema = Joi.object().keys({
    value: Joi.number().required().greater(0).error(() => new Error('O valor deve ser maior que 0')),
    id: Joi.string().required().error(() => new Error('O ID do lançamento financeiro precisa ser informado')),
});

export default ValueValidationSchema;