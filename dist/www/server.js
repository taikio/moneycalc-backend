"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = __importDefault(require("../app"));
require('dotenv').config();
var port = process.env.PORT || 3000;
app_1.default.listen(port, function () {
    var mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 4
    };
    var mongoUrl = process.env.MONGODB_URL || '';
    try {
        mongoose_1.default.connect(mongoUrl, mongooseOptions);
        //mongoose.connect('mongodb://localhost/test');
    }
    catch (err) {
        throw err;
    }
    console.log("[SERVER] Running at http://localhost:3000");
});
// Close connection when aplication is closed
process.on('SIGINT', function () {
    mongoose_1.default.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
//# sourceMappingURL=server.js.map