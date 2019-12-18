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
var user_1 = __importDefault(require("./user"));
var utilsService_1 = __importDefault(require("../utils/utilsService"));
var userService_1 = __importDefault(require("./userService"));
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
var errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
var router = express_1.default.Router();
router.post('/register', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, userService, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newUser = new user_1.default({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin
                });
                userService = new userService_1.default();
                return [4 /*yield*/, userService.register(newUser)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.send({
                        user: user,
                        token: utilsService_1.default.generateToken(user.id)
                    })];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/authenticate', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userService, userToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                userService = new userService_1.default();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userService.authenticate(email, password)];
            case 2:
                userToken = _b.sent();
                return [2 /*return*/, res.send({ token: userToken })];
            case 3:
                error_2 = _b.sent();
                next(error_2);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/resetPassword', authMiddleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, userService, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                userService = new userService_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userService.resetPassword(email, req.userId)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.send("Ok")];
            case 3:
                error_3 = _a.sent();
                next(error_3);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.use(errorMiddleware_1.default);
exports.default = router;
//# sourceMappingURL=userController.js.map