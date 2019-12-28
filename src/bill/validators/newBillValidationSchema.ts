import Joi from 'joi';

const NewBillValidationSchema = Joi.object().keys({
    PaymentMethodSysId: Joi.string().required().error(() => new Error('É necessário informar um meio de pagamento')),
    Value: Joi.number().required().greater(0).error(() => new Error('O valor deve ser maior que 0')),
    DueDate: Joi.date().required().greater(new Date(Date.now())).error(() => new Error('A data de vencimento deve ser maior que a data atual')),
    Description: Joi.string().required().error(() => new Error('É necessário informar uma descrição para o lançamento financeiro')),
});

export default NewBillValidationSchema;