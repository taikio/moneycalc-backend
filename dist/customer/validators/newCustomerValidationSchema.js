"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var NewCustomerValidationSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required().min(5).error(function () { return new Error('Informe um nome válido para o cliente'); }),
    shortName: joi_1.default.string().required().max(30).error(function () { return new Error('O nome abreviado é obrigatório e precisa conter até 30 caractéres'); }),
});
exports.default = NewCustomerValidationSchema;
//# sourceMappingURL=newCustomerValidationSchema.js.map