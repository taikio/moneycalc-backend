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
var lookupsController_1 = __importDefault(require("./lookups/lookupsController"));
var billController_1 = __importDefault(require("./bill/billController"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// ============ Rotas ===============
app.use('/users', userController_1.default);
app.use('/api/customers', customerController_1.default);
app.use('/api/serviceOrders', serviceOrderController_1.default);
app.use('/api/lookups', lookupsController_1.default);
app.use('/api/bills', billController_1.default);
// ==================================
app.get('/', function (_, res) {
    res.send("Hello ts-node!");
});
exports.default = app;
//# sourceMappingURL=app.js.map