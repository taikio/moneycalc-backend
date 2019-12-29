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
var user_1 = __importDefault(require("./user"));
var customError_1 = __importDefault(require("../utils/customError"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var utilsService_1 = __importDefault(require("../utils/utilsService"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.register = function (newUser) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.default.findOne({ email: newUser.email })];
                    case 1:
                        if (_a.sent()) {
                            throw new customError_1.default('Usuário já cadastrado!', 400, true);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        user = new user_1.default({
                            name: newUser.name,
                            email: newUser.email,
                            password: newUser.password,
                            isAdmin: newUser.isAdmin
                        });
                        return [4 /*yield*/, user_1.default.create(user)];
                    case 3:
                        _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                    case 4:
                        error_1 = _a.sent();
                        throw new customError_1.default(error_1.message, 400, error_1.isOperational || false);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_1.default.findOne({ email: email }).select('+password')];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        if (!user)
                            throw new customError_1.default('Usuário não encontrado!', 400, true);
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        if (!(_a.sent()))
                            throw new customError_1.default('Senha inválida!', 400, true);
                        delete user.password;
                        return [2 /*return*/, utilsService_1.default.generateToken(user.id)];
                    case 3:
                        error_2 = _a.sent();
                        throw new customError_1.default(error_2.message, 400, error_2.isOperational || false);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.resetPassword = function (email, currentUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var loggedUser, hash, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.default.findById(currentUserId)];
                    case 1:
                        loggedUser = _a.sent();
                        if (loggedUser === null || !loggedUser.isAdmin)
                            throw new customError_1.default('Você não tem permissão para executar esta ação', 401, true);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, bcryptjs_1.default.hash('102030', 10)];
                    case 3:
                        hash = _a.sent();
                        return [4 /*yield*/, user_1.default.updateOne({ email: email }, { password: hash })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        throw new customError_1.default(error_3.message, 400, error_3.isOperational || false);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=userService.js.map