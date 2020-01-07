"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var systemConstants_1 = __importDefault(require("../utils/systemConstants"));
var LookupsService = /** @class */ (function () {
    function LookupsService() {
    }
    LookupsService.prototype.getPaymentMethods = function () {
        var listPaymentMethods = new Array();
        listPaymentMethods.push(systemConstants_1.default.PaymentMethod_Billet);
        listPaymentMethods.push(systemConstants_1.default.PaymentMethod_Card);
        listPaymentMethods.push(systemConstants_1.default.PaymentMethod_Money);
        return listPaymentMethods;
    };
    return LookupsService;
}());
exports.default = LookupsService;
//# sourceMappingURL=lookupsService.js.map