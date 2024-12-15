import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';



const authorization = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ status: 401, message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token ?? "", config.jwt.secretKey);
        req.body.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authorization;