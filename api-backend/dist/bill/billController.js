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
var errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
var billService_1 = __importDefault(require("./billService"));
var systemConstants_1 = __importDefault(require("../utils/systemConstants"));
var router = express_1.default.Router();
router.use(authMiddleware_1.default);
router.post('/NewPayable', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var inputBillDto, billService, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                inputBillDto = {
                    PaymentMethodSysId: req.body.PaymentMethodSysId,
                    Description: req.body.Description,
                    Value: req.body.Value,
                    DueDate: req.body.DueDate
                };
                billService = new billService_1.default();
                return [4 /*yield*/, billService.newBill(inputBillDto, systemConstants_1.default.BillDestinyPay)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.send('Ok')];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/NewReceivable', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var inputBillDto, billService, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                inputBillDto = {
                    PaymentMethodSysId: req.body.PaymentMethodSysId,
                    Description: req.body.Description,
                    Value: req.body.Value,
                    DueDate: req.body.DueDate
                };
                billService = new billService_1.default();
                return [4 /*yield*/, billService.newBill(inputBillDto, systemConstants_1.default.BillDestinyReceive)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.send('Ok')];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/', function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var billService, billsList, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                billService = new billService_1.default();
                return [4 /*yield*/, billService.getAll()];
            case 1:
                billsList = _a.sent();
                return [2 /*return*/, res.send({ billsList: billsList })];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/GetByDate', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, startDate, endDate, destiny, billService, billsList, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, startDate = _a.startDate, endDate = _a.endDate, destiny = _a.destiny;
                billService = new billService_1.default();
                return [4 /*yield*/, billService.getBillsByDate(startDate, endDate, destiny)];
            case 1:
                billsList = _b.sent();
                res.send({ billsList: billsList });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                next(error_4);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/PaymentMethod', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Id, PaymentMethodSysId, billService, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, Id = _a.Id, PaymentMethodSysId = _a.PaymentMethodSysId;
                billService = new billService_1.default();
                return [4 /*yield*/, billService.updatePaymentMethod(Id, PaymentMethodSysId)];
            case 1:
                _b.sent();
                return [2 /*return*/, res.send('Ok')];
            case 2:
                error_5 = _b.sent();
                next(error_5);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/DueDate', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Id, DueDate, billService, dateArray, newDueDate, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, Id = _a.Id, DueDate = _a.DueDate;
                billService = new billService_1.default();
                dateArray = DueDate.split('-');
                newDueDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
                console.log('dueDate', newDueDate.getVarDate);
                return [4 /*yield*/, billService.updateDueDate(Id, newDueDate)];
            case 1:
                _b.sent();
                return [2 /*return*/, res.send('Ok')];
            case 2:
                error_6 = _b.sent();
                next(error_6);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/Value', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Id, Value, billService, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, Id = _a.Id, Value = _a.Value;
                billService = new billService_1.default();
                return [4 /*yield*/, billService.updateValue(Id, Value)];
            case 1:
                _b.sent();
                return [2 /*return*/, res.send('Ok')];
            case 2:
                error_7 = _b.sent();
                next(error_7);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/Cancel/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, billService, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                billService = new billService_1.default();
                return [4 /*yield*/, billService.cancel(id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.send('Ok')];
            case 2:
                error_8 = _a.sent();
                next(error_8);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/AccountBalance', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, startDate, endDate, billService, accountBalance, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
                billService = new billService_1.default();
                return [4 /*yield*/, billService.getAccountBalance(startDate, endDate)];
            case 1:
                accountBalance = _b.sent();
                return [2 /*return*/, res.send({ accountBalance: accountBalance })];
            case 2:
                error_9 = _b.sent();
                next(error_9);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/MakeRetirement/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, billService, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                billService = new billService_1.default();
                return [4 /*yield*/, billService.MakeRetirement(id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.send('Ok')];
            case 2:
                error_10 = _a.sent();
                next(error_10);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.use(errorMiddleware_1.default);
exports.default = router;
//# sourceMappingURL=billController.js.map