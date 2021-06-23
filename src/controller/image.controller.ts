import { Request, Response, NextFunction} from 'express';
import User from '../model/user.model';
import log from '../logger/logger';
  
// controller for image update
export async function ModifyImage(req:Request, res:Response, next:NextFunction){
     const _id = req.params.id
        const image = await User.findOneAndUpdate({_id},req.file,{new:true});
        if(!image){
            return res.status(404).send("data not found");   
        }else
  
     image.save()
        .then(result => {
            res.status(201).json({
            message: "successfully",
            url: "http://localhost:3000/products/" + result._id,
            });
        })
        .catch(err => {
        log.error("error in image controller",err);
        res.status(500).json({
          error: err
            });
        });
    }