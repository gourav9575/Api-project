import { Express, Request, Response } from "express";
import {getAllUser,createUser,UpdateUserHandler,deleteUserHandler, getUserByIdHandler,loginHandler,validateToken, forgotpassword,resetpassword} from './controller/controller';
import validation from './validation/user.validater';
import {createUserSchema} from './validation/user.schema';
import authjwt from './middleware/auth';
import path from "path";
import {ModifyImage} from './controller/image.controller';
import multer from 'multer';
const storage = multer.diskStorage({
  destination: './uploadimage',
  filename: function(req, file, cb) {
   return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize:1000000
  },
   fileFilter: fileFilter
});


export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  
  //token check validation router
  app.get('/api/validate',authjwt,validateToken);
  
  // Login
  app.post("/api/login",loginHandler);
 
  // Register user
  app.post("/api/registration",upload.single('profile'),validation(createUserSchema),createUser );

  // Get the user's
  app.get("/api/registrations",authjwt,getAllUser );

  //get user by Id
  app.get("/api/registration/:id",authjwt,getUserByIdHandler)

  // delete user by Email
  app.delete("/api/registration/delete/:email",authjwt,deleteUserHandler);

  //  router for update
  app.patch("/api/registration/update/:email",authjwt,UpdateUserHandler);
 
  //router for image update
  app.patch("/api/registration/modify/:id",authjwt,upload.single('Profile'),ModifyImage);
  
  //router for forgot password
  app.put("/api/forgot-password",forgotpassword);

  //router for reset password
  app.put("/api/resetpassword",resetpassword);
  }