"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var ServiceOrderCustomerValidationSchema = joi_1.default.object().keys({
    customerId: joi_1.default.string().required().error(function () { return new Error('O ID do cliente precisa ser informado'); }),
    id: joi_1.default.string().required().error(function () { return new Error('O ID do lançamento financeiro precisa ser informado'); }),
});
exports.default = ServiceOrderCustomerValidationSchema;
//# sourceMappingURL=serviceOrderCustomerValidationSchema.js.map