"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var userController_1 = __importDefault(require("./user/userController"));
var customerController_1 = __importDefault(require("./customer/customerController"));
var serviceOrderController_1 = __importDefault(require("./serviceOrder/serviceOrderController"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// ============ Rotas ===============
app.use('/user', userController_1.default);
app.use('/customer', customerController_1.default);
app.use('/serviceOrder', serviceOrderController_1.default);
// ==================================
app.get('/', function (_, res) {
    res.send("Hello ts-node!");
});
exports.default = app;
//# sourceMappingURL=app.js.map