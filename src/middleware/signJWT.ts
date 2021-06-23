import jwt from 'jsonwebtoken';
import config from '../config/config';
import log from '../logger/logger';
import User from '../model/user.model';
import UserDocument  from '../interface/registration';

const NAMESPACE = 'Auth';

const signJWT = (user : UserDocument, callback: (error: Error | null, token: string | null) => void): void => {
    
    var expirationTime = config.server.token.expireTime


    log.info(NAMESPACE, `Attempting to sign token for ${user.email}`);
   
    try {
    jwt.sign({ id:user._id,email: user.email},config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTime
            },        
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    console.log("token created in signjwt");
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        log.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};

export default signJWT;