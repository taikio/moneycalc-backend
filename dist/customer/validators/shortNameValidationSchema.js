"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var ShortNameValidationSchema = joi_1.default.object().keys({
    id: joi_1.default.string().required().error(function () { return new Error('O ID do cliente precisa ser informado'); }),
    shortName: joi_1.default.string().required().max(30).error(function () { return new Error('O nome abreviado precisa conter até 30 caractéres'); })
});
exports.default = ShortNameValidationSchema;
//# sourceMappingURL=shortNameValidationSchema.js.map