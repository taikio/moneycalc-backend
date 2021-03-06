"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var customer_1 = __importDefault(require("./customer"));
var customerService_1 = __importDefault(require("./customerService"));
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
var errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
var validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
var newCustomerValidationSchema_1 = __importDefault(require("./validators/newCustomerValidationSchema"));
var emailValidationSchema_1 = __importDefault(require("./validators/emailValidationSchema"));
var nameValidationSchema_1 = __importDefault(require("./validators/nameValidationSchema"));
var shortNameValidationSchema_1 = __importDefault(require("./validators/shortNameValidationSchema"));
var cpfValidationSchema_1 = __importDefault(require("./validators/cpfValidationSchema"));
var router = express_1.default.Router();
router.use(authMiddleware_1.default);
router.post('/', validationMiddleware_1.default(newCustomerValidationSchema_1.default), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newCustomer, customerService, customer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newCustomer = new customer_1.default({
                    name: req.body.name,
                    shortName: req.body.shortName,
                    cpf: req.body.cpf,
                    email: req.body.email
                });
                customerService = new customerService_1.default();
                return [4 /*yield*/, customerService.newCustomer(newCustomer)];
            case 1:
                customer = _a.sent();
                return [2 /*return*/, res.send({
                        customer: customer
                    })];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/GetList', function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerService, customersList, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerService = new customerService_1.default();
                return [4 /*yield*/, customerService.getAll()];
            case 1:
                customersList = _a.sent();
                return [2 /*return*/, res.send(customersList)];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/email', validationMiddleware_1.default(emailValidationSchema_1.default), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerId, email, customerService, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.body.id;
                email = req.body.email;
                console.log('customer id', customerId);
                console.log('customer email', email);
                customerService = new customerService_1.default();
                return [4 /*yield*/, customerService.changeCustomerEmail(customerId, email)];
            case 1:
                _a.sent();
                res.status(200).send();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/name', validationMiddleware_1.default(nameValidationSchema_1.default), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerId, name_1, customerService, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.body.id;
                name_1 = req.body.name;
                console.log('customer id', customerId);
                console.log('customer email', name_1);
                customerService = new customerService_1.default();
                return [4 /*yield*/, customerService.changeCustomerName(customerId, name_1)];
            case 1:
                _a.sent();
                res.status(200).send();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/shortName', validationMiddleware_1.default(shortNameValidationSchema_1.default), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerId, name_2, customerService, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.body.id;
                name_2 = req.body.shortName;
                console.log('customer id', customerId);
                console.log('customer email', name_2);
                customerService = new customerService_1.default();
                return [4 /*yield*/, customerService.changeCustomerShortName(customerId, name_2)];
            case 1:
                _a.sent();
                res.status(200).send();
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/cpf', validationMiddleware_1.default(cpfValidationSchema_1.default), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerId, cpf, customerService, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.body.id;
                cpf = req.body.cpf;
                console.log('customer id', customerId);
                console.log('customer email', cpf);
                customerService = new customerService_1.default();
                return [4 /*yield*/, customerService.changeCustomerCpf(customerId, cpf)];
            case 1:
                _a.sent();
                res.status(200).send();
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/cancel', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerId, customerService, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.params.id;
                customerService = new customerService_1.default();
                return [4 /*yield*/, customerService.delete(customerId)];
            case 1:
                _a.sent();
                res.status(200).send();
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                next(error_7);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.use(errorMiddleware_1.default);
exports.default = router;
//# sourceMappingURL=customerController.js.map