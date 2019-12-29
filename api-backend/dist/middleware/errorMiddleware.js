"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMiddleware = function (err, _req, res, _next) {
    if (!err.statusCode)
        err.statusCode = 500;
    if (!err.isOperational) {
        /* implementar geração de log aqui */
    }
    return res.status(err.statusCode).send({ error: err.message });
    // if (res.headersSent) {
    //     return next(err);
    // }
    // res.status(500).sender('error', { error: err});
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map