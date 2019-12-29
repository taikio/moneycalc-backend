"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var UserRegisterValidationSchema = joi_1.default.object().keys({
    name: joi_1.default.string().min(5).required().error(function () { return new Error('Informe um nome válido'); }),
    email: joi_1.default.string().email().required().error(function () { return new Error('Informe um endereço de e-mail válido'); }),
    password: joi_1.default.string().required().min(5).max(14).error(function () { return new Error('A senha deve conter entre 5 e 14 caratéres'); })
});
exports.default = UserRegisterValidationSchema;
//# sourceMappingURL=userRegisterValitationSchema.js.map