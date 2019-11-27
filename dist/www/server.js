"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = __importDefault(require("../app"));
var port = process.env.PORT || 3000;
app_1.default.listen(port, function () {
    var mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 4
    };
    try {
        mongoose_1.default.connect('mongodb://mongo:taikio@ds043694.mongolab.com:43694/chat', mongooseOptions);
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