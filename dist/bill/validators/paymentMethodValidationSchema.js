"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var PaymentMethodValidationSchema = joi_1.default.object().keys({
    paymentMethodSysId: joi_1.default.string().required().error(function () { return new Error('É necessário informar um meio de pagamento'); }),
    id: joi_1.default.string().required().error(function () { return new Error('O ID do lançamento financeiro precisa ser informado'); }),
});
exports.default = PaymentMethodValidationSchema;
//# sourceMappingURL=paymentMethodValidationSchema.js.map