import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validationMiddleware = (req: Request, res: Response, next: NextFunction ) => {
    let errors = validationResult(req);
    if (errors.array().length)
        return next({message:errors.array(),statusCode:400});
    next();
}

export default validationMiddleware;