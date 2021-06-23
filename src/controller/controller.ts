import { Request, Response, NextFunction} from 'express';
import User from '../model/user.model';
import log from '../logger/logger';
import jwt from 'jsonwebtoken';
import _ from "lodash";
import bcryptjs from 'bcryptjs';
import mongoose  from 'mongoose';
import signJWT from '../middleware/signJWT';
import config from '../config/config';
import mailgun from "mailgun-js";
const DOMAIN = 'sandbox190eff63b90a49ba8494e17c990a8022.mailgun.org';
const mg = mailgun({apiKey: config.mailgun_api, domain: DOMAIN});



const NAMESPACE = 'User';
//  for token validation
export async function validateToken(req: Request, res: Response, next: NextFunction){
    log.info(NAMESPACE, 'Token validated, user authorized.');

    return res.status(200).json({
        message: 'Token(s) validated'
    });
};
//controller for create registration
export  async  function createUser(req:Request , res:Response , next: NextFunction){
    let{name,address,email,phonenumber,password}= req.body;
    bcryptjs.hash(password, 10, (hasherror, hash) => {
        if (hasherror) {
            log.error("createuser",hasherror);
            return res.status(401).json({
                message: hasherror.message,
                error: hasherror
            });
        }
    //repalce password with hashedpassword
    const user= new User({
        _id:new mongoose.Types.ObjectId(),
        name,address,email, phonenumber,
        password: hash,

    }) 
    if(req.file){
        user.profile=req.file.path
    }
    //save the Data
     user.save().then((user)=>{
        return res.status(200).json(user);
    })
    .catch((error)=>{
        log.error("create user 400...",error);
        res.status(400).send(error);
    })
});   
}
 
//controller for login
export async function loginHandler (req:Request , res:Response , next: NextFunction){
    const { email, password } = req.body;
    await User.findOne({email})
    .exec()
    .then((user) => {
        if (!user) {
            log.error("user empty....loginHandler");
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
            const result = bcryptjs.compare(password,user.password) 
            console.log(result);
                if (!result) {
                    log.error("error password mismatch.......loginHandler");
                    return res.status(401).send({
                        message: 'Password Mismatch'
                    });
                } else if(result) {
                    signJWT(user, (_error, token) => {
                        if (_error) {
                            log.error("error in ...login",_error);
                            return res.status(500).send(_error);
                        } else if (token) {
                            log.info(token);
                            return res.status(200).send({
                                message:'Auth successful',
                                token: token,
                            });
                        }
                    });
                }
            })
        .catch((err) => {
            log.error(err);
            res.status(500).json({
            error:err 
        });
    });
}
// controller for get user by Id
export async function getUserByIdHandler(req:Request ,res:Response){
    try{
        const _id = req.params.id;
        const UserData = await User.findById(_id)
        if(!UserData){
            return res.status(404).send("ID not found");
        }else{
            return res.send(UserData);
        }
    }catch(error){
        log.error("error ... in getUserByIdHandler",error);
        res.status(500).send(error);
    }
}
//controller for get registration
export async  function getAllUser(req:Request , res:Response , next: NextFunction){
    try {
        const registrationdData = await User.find(req.body);
       return res.send(registrationdData);
   }catch(error){
       log.error("error...... in getUserHandler",error);
       return res.status(500).send(error);
   }
    
}
//controller for delete registration
 export async function deleteUserHandler(req: Request, res:Response,next: NextFunction){
    try{
        const email = req.params.email;
        const deleteUserData = await User.findOneAndDelete({email});
        if(!deleteUserData){
            log.error("email not found...in deleteUserHandler");
            return res.status(404).send("email not found");
        }else{
            return res.send(deleteUserData);
        }
    }catch(error){
        log.error("error ... in deleteUserHandler",error);
        res.status(500).send(error);
    }
} 

// controller for update user data
export async function UpdateUserHandler(req:Request ,res:Response,next: NextFunction){
    try{
        const email = req.params.email;
        const UpdateData = await User.findOneAndUpdate({email},req.body,{new:true});
        if(!UpdateData){
            log.error("data not found..... in UpdateUserHandler")
            return res.status(404).send("data not found");
        }else{
            return res.send(UpdateData);}
    }catch(error){
        log.error("error......in update handler");
         return res.status(500).send(error);
    }
}


//controller for sending the mail
 export async function forgotpassword(req:Request, res:Response , next:NextFunction){  
    const {email} = req.body;       
    await User.findOne({email},(err,user)=>{
       console.log(".......",user);
        if (err || !user) {
            log.error('Email does not Exist -- ForgotPassword');
            return res.status(404).json({
            status: 404,
            error: "Email does not Exist"
        });
        }   
    const token = jwt.sign({ email: user.email },config.passkey , {expiresIn: "30m"});
    const data={
    from:'robotic90455@gmail.com',
    to: email,
    subject:"Forgot Password Link",
    html:`<h2>Please click on the given link to reset your password</h2>
             <p>localhost:7000/resetpassword/${token}</p>`         
       };
       return user.updateOne({resetlink: token}, (err,success)=>{
           if(err){
               log.error("reset password link error",err);
               return res.status(400).json({error: "reset password link error"})
           }
           else{
               mg.messages().send(data, function(error, body){
                   if(error){
                      log.error("error in ... forgotpassword",error);
                       return res.status(400).json({
                           error:error.message
                       })
                   }
                   return res.status(200).json(
                      { message: "Email has been sent, Kindly activates your account"}
                    )
               });
           }
       });
    
    })
}

//controller for reset password
export async function resetpassword(req:Request, res:Response , next:NextFunction){  
   const {resetlink,newpassword} = req.body;
      if(resetlink){
        jwt.verify(resetlink, config.passkey, (error, decoded) => {
            if (error) {
                log.error("Incorrect token or it is expired.",error);
                return res.status(404).send({
                    message: "Incorrect token or it is expired.",
                    error
                });
            } 
        });
        await User.findOne({resetlink},(err,user)=>{
        
        if (err || !user) {
            log.error("User with this token does not exist.");
            return res.status(404).json({
            status: 404,
            error: "User with this token does not exist"
                });
            }
            const obj = {
                password : newpassword,
                resetlink : ''
            } 
             user.save((err,result)=>{
                if(err){
                    log.error("reset password error",err);
                    return res.status(400).json({error: "reset password  error"})
                }
                else{
                 return res.status(200).json(
                           { message: "Password has been changed"}
                         )
                    };

                }); 
            });
      }else{
          log.error("401 error in resetpassword");
          return res.status(401).json({error:"Authentication error!!!"});
      }
    
}    