import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpStatusCodes } from '../utils/httpStatusCodes';

/**
 * validate if there is an error with request data(body, params)
 */
const validationMiddleware = (req: Request, res: Response, next: NextFunction ) => {
    let errors = validationResult(req);
    if (errors.array().length)
        return next({message:errors.array(),statusCode:HttpStatusCodes.BAD_REQUEST.code});
    next();
}

export default validationMiddleware;