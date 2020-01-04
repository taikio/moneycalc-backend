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
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
var serviceOrder_1 = __importDefault(require("./serviceOrder"));
var serviceOrderService_1 = __importDefault(require("./serviceOrderService"));
var errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
var billService_1 = __importDefault(require("../bill/billService"));
var systemConstants_1 = __importDefault(require("../utils/systemConstants"));
var validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
var newServiceOrderValidationSchema_1 = __importDefault(require("./validators/newServiceOrderValidationSchema"));
var serviceOrderCustomerValidationSchema_1 = __importDefault(require("./validators/serviceOrderCustomerValidationSchema"));
var serviceOrderDescriptionValidationSchema_1 = __importDefault(require("./validators/serviceOrderDescriptionValidationSchema"));
var router = express_1.default.Router();
router.use(authMiddleware_1.default);
router.post('/New', validationMiddleware_1.default(newServiceOrderValidationSchema_1.default), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bill, billService, savedBill, newServiceOrder, serviceOrderService, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                bill = {
                    Description: req.body.description,
                    PaymentMethodSysId: req.body.paymentMethodSysId,
                    Value: req.body.value,
                    DueDate: req.body.dueDate
                };
                billService = new billService_1.default();
                return [4 /*yield*/, billService.newBill(bill, systemConstants_1.default.BillDestinyReceive)];
            case 1:
                savedBill = _a.sent();
                newServiceOrder = new serviceOrder_1.default({
                    description: req.body.description,
                    customer: req.body.customerId,
                    bill: savedBill.id
                });
                serviceOrderService = new serviceOrderService_1.default();
                return [4 /*yield*/, serviceOrderService.newServiceOrder(newServiceOrder)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send()];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/GetList', function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var service, serviceOrderList, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                service = new serviceOrderService_1.default();
                return [4 /*yield*/, service.getAll()];
            case 1:
                serviceOrderList = _a.sent();
                return [2 /*return*/, res.send(serviceOrderList)];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/GetByDate', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, startDate, endDate, serviceOrderService, serviceOrderList, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
                serviceOrderService = new serviceOrderService_1.default();
                return [4 /*yield*/, serviceOrderService.GetServiceOrdersByDate(startDate, endDate)];
            case 1:
                serviceOrderList = _b.sent();
                return [2 /*return*/, res.send(serviceOrderList)];
            case 2:
                error_3 = _b.sent();
                next(error_3);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/Cancel:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, serviceOrderService, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                serviceOrderService = new serviceOrderService_1.default();
                return [4 /*yield*/, serviceOrderService.CancelServiceOrder(id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).send()];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/Customer', validationMiddleware_1.default(serviceOrderCustomerValidationSchema_1.default), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, customerId, id, serviceOrderService, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, customerId = _a.customerId, id = _a.id;
                serviceOrderService = new serviceOrderService_1.default();
                return [4 /*yield*/, serviceOrderService.changeCustomer(id, customerId)];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(200).send()];
            case 2:
                error_5 = _b.sent();
                next(error_5);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/Description', validationMiddleware_1.default(serviceOrderDescriptionValidationSchema_1.default), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, description, serviceOrderService, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, description = _a.description;
                serviceOrderService = new serviceOrderService_1.default();
                return [4 /*yield*/, serviceOrderService.changeDescription(id, description)];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(200).send()];
            case 2:
                error_6 = _b.sent();
                next(error_6);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.use(errorMiddleware_1.default);
exports.default = router;
//# sourceMappingURL=serviceOrderController.js.map