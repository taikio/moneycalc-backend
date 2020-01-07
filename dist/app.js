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
var path_1 = __importDefault(require("path"));
var ejs_1 = __importDefault(require("ejs"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('html', ejs_1.default.renderFile);
app.set('view engine', 'html');
app.use(express_1.default.static(__dirname + '/public'));
app.use(cors_1.default());
/* Habilitando cross origin */
// app.all('*', function(_req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
// ============ Rotas ===============
app.use('/users', userController_1.default);
app.use('/api/customers', customerController_1.default);
app.use('/api/serviceOrders', serviceOrderController_1.default);
app.use('/api/lookups', lookupsController_1.default);
app.use('/api/bills', billController_1.default);
// ==================================
app.get('/', function (_, res) {
    res.render('index');
});
app.get('/auth/sign', function (_, res) {
    res.render('index');
});
app.get('/dashboard', function (_, res) {
    res.render('index');
});
exports.default = app;
//# sourceMappingURL=app.js.map