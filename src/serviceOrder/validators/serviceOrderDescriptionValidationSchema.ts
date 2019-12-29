import Joi from 'joi';

const ServiceOrderDescriptionValidationSchema = Joi.object().keys({
    Description: Joi.string().required().error(() => new Error('É necessário informar uma descrição')),
    Id: Joi.string().required().error(() => new Error('O ID do lançamento financeiro precisa ser informado')),
});

export default ServiceOrderDescriptionValidationSchema;