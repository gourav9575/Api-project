"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../logger/logger"));
const NAMESPACE = 'Auth';
const authjwt = (req, res, next) => {
    var _a;
    logger_1.default.info(NAMESPACE, 'Validating token');
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).send({
                    message: error,
                    error
                });
            }
            else {
                // res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).send({
            message: 'Unauthorized'
        });
    }
};
exports.default = authjwt;
//# sourceMappingURL=auth.js.map