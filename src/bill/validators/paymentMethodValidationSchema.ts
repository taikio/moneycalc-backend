import Joi from 'joi';

const PaymentMethodValidationSchema = Joi.object().keys({
    PaymentMethodSysId: Joi.string().required().error(() => new Error('É necessário informar um meio de pagamento')),
    Id: Joi.string().required().error(() => new Error('O ID do lançamento financeiro precisa ser informado')),
});

export default PaymentMethodValidationSchema;