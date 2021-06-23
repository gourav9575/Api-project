import {object ,string,number } from "yup";

//for registration
export const  createUserSchema = object({
    body: object({
        name: string().max(100).required("Name is required"),
        address:string().max(100).required(),
        email: string().email("Must be valid email").required("Email is required"),
        phonenumber:number() .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(8)
        .required('A phone number is required'),
        password:string().matches(/^[a-zA-Z0-9_.-]*$/," Password ca only contain latin letters"),     
       
        
    }),
});

//for login
export const createUserloginSchema = object({
    body: object({
      password: string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
  
      email: string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
  });


