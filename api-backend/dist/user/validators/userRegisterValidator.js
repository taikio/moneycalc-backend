"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
// import { NextFunction, Request, Response } from 'express';
exports.userValidationRules = function () {
    express_validator_1.check('name', 'Informe um nome válido').not().isEmpty();
    express_validator_1.check('email', 'Informe um e-mail válido').isEmail();
    express_validator_1.check('password', 'A senha deve conter entre 5 e 14 caractéres').isLength({ min: 5, max: 14 });
};
exports.handleValidationErrors = function (errors) {
    var extractedErrors = [];
    if (!errors.isEmpty()) {
        errors.array().map(function (err) {
            var _a;
            return extractedErrors.push((_a = {}, _a[err.param] = err.msg, _a));
        });
    }
    return extractedErrors;
};
// export const userValidationRules = (req: Request, res: Response, next: NextFunction) => {
//     body('name', 'Informe um nome válido').not().isEmpty();
//     const errors = validationResult(req)
//     if (errors.isEmpty())
//         return next();
//     const extractedErrors: object[] = [];
//     errors.array().map( err => extractedErrors.push({ [err.param] : err.msg}));
//     return res.status(422).send({ errors: extractedErrors});
// }
// const validations = (req: Request) => {
//     return [
//         body('name', 'Informe um nome válido').not().isEmpty()
//     ]
// }
//# sourceMappingURL=userRegisterValidator.js.map