"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authMiddleware = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });
    var parts = authHeader.split(' ');
    if (parts.length < 2)
        return res.status(401).send({ error: 'Token error' });
    var scheme = parts[0], token = parts[1];
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });
    var secretKey = process.env.SECRETKEY || '';
    jsonwebtoken_1.default.verify(token, secretKey, function (err, decoded) {
        if (err)
            return res.status(401).send({ error: 'Token invalid' });
        req.userId = decoded.userId;
        return next();
    });
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map