import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * validate if there is an error with request data(body, params)
 */
const validationMiddleware = (req: Request, res: Response, next: NextFunction ) => {
    let errors = validationResult(req);
    if (errors.array().length)
        return next({message:errors.array(),statusCode:400});
    next();
}

export default validationMiddleware;