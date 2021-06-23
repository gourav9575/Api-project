import jwt from 'jsonwebtoken';
import config from '../config/config';
import log from '../logger/logger';
import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'Auth';

const authjwt = (req: Request, res: Response, next: NextFunction) => {
    log.info(NAMESPACE, 'Validating token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).send({
                    message: error,
                    error
                });
            } else {
                next();
            }
        });
    } else {
        log.error("unauthorized....token")
        return res.status(401).send({
            message: 'Unauthorized'
        });
    }
};

export default authjwt;