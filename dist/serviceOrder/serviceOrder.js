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
var ServiceOrderSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer' },
    bill: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Bill' },
    isCanceled: { type: Boolean, default: false }
});
exports.default = mongoose_1.default.model('ServiceOrder', ServiceOrderSchema);
//# sourceMappingURL=serviceOrder.js.map