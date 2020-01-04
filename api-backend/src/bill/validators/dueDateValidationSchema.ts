import Joi from 'joi';

const DueDateValidationSchema = Joi.object().keys({
    id: Joi.string().required().error(() => new Error('O ID do lançamento financeiro precisa ser informado')),
    dueDate: Joi.date().required().greater(new Date(Date.now())).error(() => new Error('A data de vencimento deve ser maior que a data atual'))
});

export default DueDateValidationSchema;