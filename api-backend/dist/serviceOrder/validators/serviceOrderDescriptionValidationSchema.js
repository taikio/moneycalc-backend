"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var ServiceOrderDescriptionValidationSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required().error(function () { return new Error('É necessário informar uma descrição'); }),
    id: joi_1.default.string().required().error(function () { return new Error('O ID do lançamento financeiro precisa ser informado'); }),
});
exports.default = ServiceOrderDescriptionValidationSchema;
//# sourceMappingURL=serviceOrderDescriptionValidationSchema.js.map