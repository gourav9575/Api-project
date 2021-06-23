"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger/logger"));
const connection_1 = __importDefault(require("./database/connection"));
const routers_1 = __importDefault(require("./routers"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT || 1337;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, () => {
    logger_1.default.info(`Server listing at http://localhost:${port}`);
    console.log(`Server is running at http://localhost:${port}`);
    connection_1.default();
    routers_1.default(app);
});
//# sourceMappingURL=app.js.map