"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserloginSchema = exports.createUserSchema = void 0;
const yup_1 = require("yup");
//for registration
exports.createUserSchema = yup_1.object({
    body: yup_1.object({
        name: yup_1.string().max(100).required("Name is required"),
        address: yup_1.string().max(100).required(),
        email: yup_1.string().email("Must be valid email").required("Email is required"),
        phonenumber: yup_1.number().typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(8)
            .required('A phone number is required'),
        password: yup_1.string().matches(/^[a-zA-Z0-9_.-]*$/, " Password ca only contain latin letters"),
    }),
});
//for login
exports.createUserloginSchema = yup_1.object({
    body: yup_1.object({
        password: yup_1.string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        email: yup_1.string()
            .email("Must be a valid email")
            .required("Email is required"),
    }),
});
//# sourceMappingURL=user.schema.js.map