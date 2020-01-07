"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var CpfValidationSchema = joi_1.default.object().keys({
    id: joi_1.default.string().required().error(function () { return new Error('O ID do cliente precisa ser informado'); }),
    cpf: joi_1.default.string().required().length(11).error(function () { return new Error('Informe um CPF válido para o cliente'); })
});
exports.default = CpfValidationSchema;
//# sourceMappingURL=cpfValidationSchema.js.map