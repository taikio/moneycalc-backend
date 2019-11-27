"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var customError_1 = require("./utils/customError");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var userController_1 = __importDefault(require("./user/userController"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/user', userController_1.default);
app.get('/', function (_, res) {
    res.send("Hello ts-node!");
});
app.get('/exception', function (_, res) {
    try {
        throw new customError_1.CustomError('Teste de erro customizado', 500, true);
    }
    catch (error) {
        if (error instanceof customError_1.CustomError) {
            return res.status(error.statusCode).send({ error: error.message });
        }
        return res.status(400).send("erro genérico");
    }
    res.send("Ok");
});
exports.default = app;
//# sourceMappingURL=app.js.map