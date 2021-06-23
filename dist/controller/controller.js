"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserHandler = exports.deleteUserHandler = exports.getAllUser = exports.getUserByIdHandler = exports.loginHandler = exports.createUser = exports.validateToken = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const logger_1 = __importDefault(require("../logger/logger"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const signJWT_1 = __importDefault(require("../middleware/signJWT"));
const NAMESPACE = 'User';
//  for token validation
function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(NAMESPACE, 'Token validated, user authorized.');
        return res.status(200).json({
            message: 'Token(s) validated'
        });
    });
}
exports.validateToken = validateToken;
;
//controller for create registration
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, address, email, phonenumber, password } = req.body;
        bcryptjs_1.default.hash(password, 10, (hasherror, hash) => {
            if (hasherror) {
                return res.status(401).json({
                    message: hasherror.message,
                    error: hasherror
                });
            }
            //repalce password with hashedpassword
            const user = new user_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name, address, email, phonenumber,
                password: hash,
            });
            //save the Data
            user.save().then((user) => {
                return res.status(200).json(user);
            })
                .catch((error) => {
                logger_1.default.error("error ....in create user");
                res.status(400).send(error);
            });
        });
    });
}
exports.createUser = createUser;
//controller for login
function loginHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        // try{
        //  const Data= await User.find({ email })
        //  console.log(Data);       
        //  if (!Data) {
        //             console.log("unauthorized");
        //             return res.status(401).send({
        //                 message: 'Unauthorized'
        //             });
        //         }
        user_model_1.default.find({ email })
            .exec()
            .then((users) => {
            if (!users) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
                if (error) {
                    logger_1.default.error("error password mismatch........");
                    return res.status(401).send({
                        message: 'Password Mismatch'
                    });
                }
                else if (result) {
                    signJWT_1.default(users[0], (error, token) => {
                        if (error) {
                            console.log(error);
                            logger_1.default.error(error);
                            return res.status(500).send(error);
                        }
                        else if (token) {
                            console.log(token);
                            logger_1.default.info(token);
                            return res.status(200).send({
                                message: 'Auth successful',
                                token: token,
                                user: users[0]
                            });
                        }
                    });
                }
            });
        })
            .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });
}
exports.loginHandler = loginHandler;
// controller for get user by Id
function getUserByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _id = req.params.id;
            const UserData = yield user_model_1.default.findById(_id);
            if (!UserData) {
                return res.status(404).send("ID not found");
            }
            else {
                return res.send(UserData);
            }
        }
        catch (e) {
            logger_1.default.error("error ... in getUserByIdHandler");
            res.status(500).send(e);
        }
    });
}
exports.getUserByIdHandler = getUserByIdHandler;
//controller for get registration
function getAllUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const registrationdData = yield user_model_1.default.find(req.body);
            return res.send(registrationdData);
        }
        catch (e) {
            logger_1.default.error("error...... in getUserHandler");
            return res.send(e);
        }
    });
}
exports.getAllUser = getAllUser;
//controller for delete registration
function deleteUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.params.email;
            const deleteUserData = yield user_model_1.default.findOneAndDelete({ email });
            if (!deleteUserData) {
                logger_1.default.error("email not found ... in deleteUserHandler");
                return res.status(404).send("email not found");
            }
            else {
                return res.send(deleteUserData);
            }
        }
        catch (e) {
            logger_1.default.error("error ... in delteUserHandler");
            res.status(500).send(e);
        }
    });
}
exports.deleteUserHandler = deleteUserHandler;
// controller for update user data
function UpdateUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.params.email;
            const UpdateData = yield user_model_1.default.findOneAndUpdate({ email }, req.body, { new: true });
            if (!UpdateData) {
                return res.status(404).send("data not found");
            }
            else {
                return res.send(UpdateData);
            }
        }
        catch (e) {
            logger_1.default.error("error......in update handler");
            return res.status(500).send(e);
        }
    });
}
exports.UpdateUserHandler = UpdateUserHandler;
//# sourceMappingURL=controller.js.map