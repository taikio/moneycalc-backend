import Joi from 'joi';

const DueDateValidationSchema = Joi.object().keys({
    Id: Joi.string().required().error(() => new Error('O ID do lançamento financeiro precisa ser informado')),
    DueDate: Joi.date().required().greater(new Date(Date.now())).error(() => new Error('A data de vencimento deve ser maior que a data atual'))
});

export default DueDateValidationSchema;