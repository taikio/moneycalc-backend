import Joi from 'joi';

const ServiceOrderDescriptionValidationSchema = Joi.object().keys({
    description: Joi.string().required().error(() => new Error('É necessário informar uma descrição')),
    id: Joi.string().required().error(() => new Error('O ID do lançamento financeiro precisa ser informado')),
});

export default ServiceOrderDescriptionValidationSchema;