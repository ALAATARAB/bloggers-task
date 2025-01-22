import { NextFunction, Request, Response } from "express";
import { getData, tokenData } from "../utils/token";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        let {userId} = getData(req.get('Authorization') as string);
        req.body.userId = userId;
        next();
    }
    catch(err) {
        return next(err);
    }
}