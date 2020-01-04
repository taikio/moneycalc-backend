import Joi from 'joi';

const NewServideOrderValidationSchema = Joi.object().keys({
    paymentMethodSysId: Joi.string().required().error(() => new Error('É necessário informar um meio de pagamento')),
    value: Joi.number().required().greater(0).error(() => new Error('O valor deve ser maior que 0')),
    dueDate: Joi.date().required().greater(new Date(Date.now())).error(() => new Error('A data de vencimento deve ser maior que a data atual')),
    description: Joi.string().required().error(() => new Error('É necessário informar uma descrição para o lançamento financeiro')),
    customerId: Joi.string().required().error(() => new Error('O ID do cliente precisa ser informado'))
});

export default NewServideOrderValidationSchema;