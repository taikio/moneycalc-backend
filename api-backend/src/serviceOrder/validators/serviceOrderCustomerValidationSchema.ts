import Joi from 'joi';

const ServiceOrderCustomerValidationSchema = Joi.object().keys({
    CustomerId: Joi.string().required().error(() => new Error('O ID do cliente precisa ser informado')),
    Id: Joi.string().required().error(() => new Error('O ID do lançamento financeiro precisa ser informado')),
});

export default ServiceOrderCustomerValidationSchema;