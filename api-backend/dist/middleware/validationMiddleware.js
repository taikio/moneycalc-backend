"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validationMiddleware = function (schema, property) {
    if (property === void 0) { property = 'BODY'; }
    return function (req, res, next) {
        var error;
        switch (property) {
            case 'BODY':
                error = joi_1.default.validate(req.body, schema).error;
                break;
            case 'QUERY':
                error = joi_1.default.validate(req.query, schema).error;
                break;
            default:
                error = joi_1.default.validate(req.body, schema).error;
                break;
        }
        if (error == null) {
            next();
        }
        else {
            res.status(400).send({ error: error.message });
        }
    };
};
exports.default = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map