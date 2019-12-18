"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SvcUtils = /** @class */ (function () {
    function SvcUtils() {
    }
    SvcUtils.generateToken = function (userId) {
        var secretkey = process.env.SECRETKEY || '';
        return jsonwebtoken_1.default.sign({ userId: userId }, secretkey, {
            expiresIn: 86400
        });
    };
    return SvcUtils;
}());
exports.default = SvcUtils;
//# sourceMappingURL=utilsService.js.map