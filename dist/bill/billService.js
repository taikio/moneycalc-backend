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
var linq_1 = __importDefault(require("linq"));
var systemConstants_1 = __importDefault(require("../utils/systemConstants"));
var bill_1 = __importDefault(require("./bill"));
var customError_1 = __importDefault(require("../utils/customError"));
var BillService = /** @class */ (function () {
    function BillService() {
    }
    BillService.prototype.newBill = function (newBillDto, destiny) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentMethod, billDestiny, bill, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        paymentMethod = linq_1.default.from(systemConstants_1.default.ListPaymentMethods())
                            .firstOrDefault(function (x) { return x.SysId == newBillDto.PaymentMethodSysId; });
                        billDestiny = destiny.toUpperCase() == systemConstants_1.default.BillDestinyReceive
                            ? systemConstants_1.default.BillDestinyReceive
                            : systemConstants_1.default.BillDestinyPay;
                        bill = new bill_1.default({
                            paymentMethod: paymentMethod,
                            value: newBillDto.Value,
                            destiny: billDestiny,
                            status: systemConstants_1.default.BillStatus_EmAberto,
                            dueDate: newBillDto.DueDate,
                            description: newBillDto.Description
                        });
                        return [4 /*yield*/, bill_1.default.create(bill)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new customError_1.default(error_1.message, 400, error_1.isOperational || false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var billsList, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, bill_1.default.find()];
                    case 1:
                        billsList = _a.sent();
                        return [2 /*return*/, billsList];
                    case 2:
                        error_2 = _a.sent();
                        throw new customError_1.default(error_2.message, 400, error_2.isOperational || false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillService.prototype.getBillsByDate = function (startDate, endDate, destiny) {
        return __awaiter(this, void 0, void 0, function () {
            var billsList, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, bill_1.default.find().where('dueDate').gte(startDate).lte(endDate)
                                .where('destiny').equals(destiny)];
                    case 1:
                        billsList = _a.sent();
                        return [2 /*return*/, billsList];
                    case 2:
                        error_3 = _a.sent();
                        throw new customError_1.default(error_3.message, 400, error_3.isOperational || false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillService.prototype.updatePaymentMethod = function (id, PaymentMethodSysId) {
        return __awaiter(this, void 0, void 0, function () {
            var bill, paymentMethod, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, bill_1.default.findById(id)];
                    case 1:
                        bill = _a.sent();
                        if (!bill) {
                            throw new customError_1.default("N\u00E3o foi encontrado nenhum lan\u00E7amento financeiro com o id " + id, 400, true);
                        }
                        paymentMethod = linq_1.default.from(systemConstants_1.default.ListPaymentMethods()).firstOrDefault(function (x) { return x.SysId === PaymentMethodSysId; });
                        if (!paymentMethod) {
                            throw new customError_1.default('Não foi encontrado um meio de pagamento válido!', 400, true);
                        }
                        return [4 /*yield*/, bill_1.default.updateOne({ _id: id }, { paymentMethod: paymentMethod })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        throw new customError_1.default(error_4.message, 400, error_4.isOperational || false);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillService.prototype.updateDueDate = function (id, dueDate) {
        return __awaiter(this, void 0, void 0, function () {
            var bill, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, bill_1.default.findById(id)];
                    case 1:
                        bill = _a.sent();
                        if (!bill) {
                            throw new customError_1.default("N\u00E3o foi encontrado nenhum lan\u00E7amento financeiro com o id " + id, 400, true);
                        }
                        if (dueDate === null || dueDate === undefined || dueDate < new Date(Date.now())) {
                            throw new customError_1.default('A data de vencimento deve ser maior que a data atual!', 400, true);
                        }
                        return [4 /*yield*/, bill_1.default.updateOne({ _id: id }, { dueDate: dueDate })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        throw new customError_1.default(error_5.message, 400, error_5.isOperational || false);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillService.prototype.updateValue = function (id, value) {
        return __awaiter(this, void 0, void 0, function () {
            var bill, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, bill_1.default.findById(id)];
                    case 1:
                        bill = _a.sent();
                        if (!bill) {
                            throw new customError_1.default("N\u00E3o foi encontrado nenhum lan\u00E7amento financeiro com o id " + id, 400, true);
                        }
                        if (value <= 0) {
                            throw new customError_1.default('O valor deve ser maior que zero', 400, true);
                        }
                        return [4 /*yield*/, bill_1.default.updateOne({ _id: id }, { value: value })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        throw new customError_1.default(error_6.message, 400, error_6.isOperational || false);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var bill, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, bill_1.default.findById(id)];
                    case 1:
                        bill = _a.sent();
                        if (!bill) {
                            throw new customError_1.default('Não foi encontrado um lançamento financeiro com o ID informado', 400, true);
                        }
                        return [4 /*yield*/, bill_1.default.deleteOne({ _id: id })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        throw new customError_1.default(error_7.message, 400, error_7.isOperational || false);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillService.prototype.getAccountBalance = function (startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var billsList, incomingPending, outgoingPending, incomingPaid, outgoingPaid, totalIncomes, totalOutgoing, accountBalance, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, bill_1.default.find().where('dueDate').gte(startDate).lte(endDate)];
                    case 1:
                        billsList = _a.sent();
                        incomingPending = linq_1.default.from(billsList).where(function (x) { return x.destiny === systemConstants_1.default.BillDestinyReceive && !x.paid; });
                        outgoingPending = linq_1.default.from(billsList).where(function (x) { return x.destiny === systemConstants_1.default.BillDestinyPay && !x.paid; });
                        incomingPaid = linq_1.default.from(billsList).where(function (x) { return x.destiny === systemConstants_1.default.BillDestinyReceive && x.paid; });
                        outgoingPaid = linq_1.default.from(billsList).where(function (x) { return x.destiny === systemConstants_1.default.BillDestinyPay && x.paid; });
                        totalIncomes = linq_1.default.from(billsList).where(function (x) { return x.destiny === systemConstants_1.default.BillDestinyReceive; });
                        totalOutgoing = linq_1.default.from(billsList).where(function (x) { return x.destiny === systemConstants_1.default.BillDestinyPay; });
                        accountBalance = {
                            IncomingPendingQuantity: incomingPending.count(),
                            IncomingPendingValue: incomingPending.sum(function (x) { return x.value; }),
                            IncomingPaidQuantity: incomingPaid.count(),
                            IncomingPaidValue: incomingPaid.sum(function (x) { return x.value; }),
                            OutgoingPendingQuantity: outgoingPending.count(),
                            OutgoingPendingValue: outgoingPending.sum(function (x) { return x.value; }),
                            OutgoingPaidQuantity: outgoingPaid.sum(),
                            OutgoingPaidValue: outgoingPaid.sum(function (x) { return x.value; }),
                            IncomingOutgoingBalance: incomingPaid.sum(function (x) { return x.value; }) - outgoingPaid.sum(function (x) { return x.value; }),
                            IncomingOutgoingProjection: totalIncomes.sum(function (x) { return x.value; }) - totalOutgoing.sum(function (x) { return x.value; })
                        };
                        return [2 /*return*/, accountBalance];
                    case 2:
                        error_8 = _a.sent();
                        throw new customError_1.default(error_8.message, 400, error_8.isOperational || false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Confirma a baixa do lançamento
     */
    BillService.prototype.MakeRetirement = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var bill, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, bill_1.default.findById(id)];
                    case 1:
                        bill = _a.sent();
                        if (!bill) {
                            throw new customError_1.default('Não foi encontrado um lançamento financeiro com o ID informado', 400, true);
                        }
                        bill.paid = true;
                        bill.payDay = new Date(Date.now());
                        bill.status = systemConstants_1.default.BillStatus_Pago;
                        return [4 /*yield*/, bill.save()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        throw new customError_1.default(error_9.message, 400, error_9.isOperational || false);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BillService;
}());
exports.default = BillService;
//# sourceMappingURL=billService.js.map