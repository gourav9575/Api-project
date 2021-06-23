"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller/controller");
const user_validater_1 = __importDefault(require("./validation/user.validater"));
const user_schema_1 = require("./validation/user.schema");
const auth_1 = __importDefault(require("./middleware/auth"));
function default_1(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    app.get('/api/validate', auth_1.default, controller_1.validateToken);
    // Login
    app.post("/api/login", controller_1.loginHandler);
    // validation(createUserloginSchema)
    // Register user
    app.post("/api/registration", user_validater_1.default(user_schema_1.createUserSchema), controller_1.createUser);
    // Get the user's
    app.get("/api/registrations", controller_1.getAllUser);
    //get user by Id
    app.get("/api/registration/:id", controller_1.getUserByIdHandler);
    // delete user by Email
    app.delete("/api/registration/delete/:email", controller_1.deleteUserHandler);
    //  router for update
    app.patch("/api/registration/update/:email", controller_1.UpdateUserHandler);
}
exports.default = default_1;
//# sourceMappingURL=routers.js.map