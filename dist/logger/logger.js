"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const log = winston_1.createLogger({
    transports: [
        new winston_1.transports.File({
            filename: 'info.log',
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        }),
        new winston_1.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        })
    ]
});
exports.default = log;
//# sourceMappingURL=logger.js.map