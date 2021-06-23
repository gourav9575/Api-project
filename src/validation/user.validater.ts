
import { Request, Response ,NextFunction} from "express";
 import { AnySchema} from "yup";
 import log from "../logger/logger";

  const Validate=(schema: AnySchema)=> async (req:Request , res: Response, next: NextFunction) => {
        try{

         await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        
        return  next();
        }catch(e) {
            log.error("user.validation",e);
            return res.status(400).send(e.errors);
        }
    }    

    export default Validate;

