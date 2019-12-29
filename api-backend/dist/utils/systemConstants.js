"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PaymentMethod_1 = __importDefault(require("./PaymentMethod"));
var SystemConstants = /** @class */ (function () {
    function SystemConstants() {
    }
    SystemConstants.ListPaymentMethods = function () {
        var listReturn = new Array();
        listReturn.push(this.PaymentMethod_Card);
        listReturn.push(this.PaymentMethod_Money);
        listReturn.push(this.PaymentMethod_Billet);
        return listReturn;
    };
    SystemConstants.BillDestinyReceive = 'R';
    SystemConstants.BillDestinyPay = 'P';
    SystemConstants.BillStatus_EmAberto = 'ATIVO';
    SystemConstants.BillStatus_Vencido = 'VENCIDO';
    SystemConstants.BillStatus_Pago = 'PAGO';
    SystemConstants.BillStatus_Cancelado = 'CANCELADO';
    SystemConstants.PaymentMethod_Money = new PaymentMethod_1.default("DINHEIRO", "Dinheiro");
    SystemConstants.PaymentMethod_Card = new PaymentMethod_1.default("CARTAO", "Cartao de Credito");
    SystemConstants.PaymentMethod_Billet = new PaymentMethod_1.default("BOLETO", "Boleto Bancario");
    return SystemConstants;
}());
exports.default = SystemConstants;
//# sourceMappingURL=systemConstants.js.map