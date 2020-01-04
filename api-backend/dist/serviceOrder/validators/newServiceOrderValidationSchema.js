"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var NewServideOrderValidationSchema = joi_1.default.object().keys({
    paymentMethodSysId: joi_1.default.string().required().error(function () { return new Error('É necessário informar um meio de pagamento'); }),
    value: joi_1.default.number().required().greater(0).error(function () { return new Error('O valor deve ser maior que 0'); }),
    dueDate: joi_1.default.date().required().greater(new Date(Date.now())).error(function () { return new Error('A data de vencimento deve ser maior que a data atual'); }),
    description: joi_1.default.string().required().error(function () { return new Error('É necessário informar uma descrição para o lançamento financeiro'); }),
    customerId: joi_1.default.string().required().error(function () { return new Error('O ID do cliente precisa ser informado'); })
});
exports.default = NewServideOrderValidationSchema;
//# sourceMappingURL=newServiceOrderValidationSchema.js.map