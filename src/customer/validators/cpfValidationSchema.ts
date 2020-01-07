import Joi from 'joi';

const CpfValidationSchema = Joi.object().keys({
    id: Joi.string().required().error(() => new Error('O ID do cliente precisa ser informado')),
    cpf: Joi.string().required().length(11).error(() => new Error('Informe um CPF válido para o cliente'))
});

export default CpfValidationSchema;