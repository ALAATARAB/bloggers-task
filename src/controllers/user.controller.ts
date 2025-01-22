import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { HttpStatusCodes } from "../utils/httpStatusCodes";
import { ObjectId } from "mongoose";
import logger from "../utils/logger";
import ApiError from "../utils/api-error";

export default class UserController {
    private userService: UserService = new UserService();
    
    promote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let idToPromote = req.body.id as ObjectId;
            if(! await this.userService.getById(idToPromote)) {
                throw new ApiError("The user doesn't exist",HttpStatusCodes.NOT_FOUND.code);
            }
            let user = await this.userService.promoteUser(idToPromote);
            logger.info(`user #${user._id}: promoted to admin`);
            res.status(HttpStatusCodes.OK.code).send({message:"User promoted successfully"});
        }
        catch(err) {
            next(err);
        }
    }
}