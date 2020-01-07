"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var DueDateValidationSchema = joi_1.default.object().keys({
    id: joi_1.default.string().required().error(function () { return new Error('O ID do lançamento financeiro precisa ser informado'); }),
    dueDate: joi_1.default.date().required().greater(new Date(Date.now())).error(function () { return new Error('A data de vencimento deve ser maior que a data atual'); })
});
exports.default = DueDateValidationSchema;
//# sourceMappingURL=dueDateValidationSchema.js.map