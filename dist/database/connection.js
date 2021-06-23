"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../logger/logger"));
dotenv_1.default.config();
const Url = process.env.DB_CONNECT || "mongodb+srv://registrationdb:gourav@cluster0.4yiea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
function connect() {
    mongoose_1.default.connect(Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
        .then(() => {
        logger_1.default.info("Database connected");
        console.log("Database connected");
    })
        .catch((error) => {
        logger_1.default.error("db error", error);
        console.log(error);
        process.exit(1);
    });
}
exports.default = connect;
//# sourceMappingURL=connection.js.map