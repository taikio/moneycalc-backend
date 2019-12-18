"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var BillSchema = new mongoose_1.Schema({
    paymentMethod: { type: Object, required: true },
    value: { type: Number, required: true },
    destiny: { type: String, required: true },
    status: { type: String, required: true, default: 'ATIVO' },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true },
    payDay: { type: Date, default: null },
    reversalDate: { type: Date, default: null },
    cancelDate: { type: Date, default: null },
});
exports.default = mongoose_1.default.model('Bill', BillSchema);
//# sourceMappingURL=bill.js.map