"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CustomValidationError = /** @class */ (function (_super) {
    __extends(CustomValidationError, _super);
    function CustomValidationError(property, message, statusCode) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.property = property;
        _this.statusCode = statusCode;
        Error.captureStackTrace(_this);
        return _this;
    }
    return CustomValidationError;
}(Error));
exports.default = CustomValidationError;
//# sourceMappingURL=customValidationError.js.map