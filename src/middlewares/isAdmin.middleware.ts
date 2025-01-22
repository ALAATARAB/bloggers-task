import { NextFunction, Request, Response } from "express";
import { getData, tokenData } from "../utils/token";
import ApiError from "../utils/api-error";
import { HttpStatusCodes } from "../utils/httpStatusCodes";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        let {userId, role} = getData(req.get('Authorization') as string);
        if(role != 'admin') throw new ApiError("You are not an admin", HttpStatusCodes.UNAUTHORIZED.code);
        req.body.userId = userId;
        next();
    }
    catch(err) {
        return next(err);
    }
}