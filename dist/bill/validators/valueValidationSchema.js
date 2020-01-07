"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var ValueValidationSchema = joi_1.default.object().keys({
    value: joi_1.default.number().required().greater(0).error(function () { return new Error('O valor deve ser maior que 0'); }),
    id: joi_1.default.string().required().error(function () { return new Error('O ID do lançamento financeiro precisa ser informado'); }),
});
exports.default = ValueValidationSchema;
//# sourceMappingURL=valueValidationSchema.js.map