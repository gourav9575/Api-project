"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../logger/logger"));
const NAMESPACE = 'Auth';
const signJWT = (user, callback) => {
    var expirationTime = config_1.default.server.token.expireTime;
    logger_1.default.info(NAMESPACE, `Attempting to sign token for ${user.email}`);
    try {
        jsonwebtoken_1.default.sign({ email: user.email }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTime
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                console.log("token created in signjwt");
                callback(null, token);
            }
        });
    }
    catch (error) {
        logger_1.default.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};
exports.default = signJWT;
//# sourceMappingURL=signJWT.js.map