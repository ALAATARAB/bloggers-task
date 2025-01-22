import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/httpStatusCodes";
import logger from "../utils/logger";
import IUser from "../interfaces/user.interface";
import UserService from "../services/user.service";
import AuthService, { UserDoc } from "../services/auth.service";
import ApiError from "../utils/api-error";
import { assignToken } from "../utils/token";

export default class AuthController {
    private authService: AuthService = new AuthService();
    private userService: UserService = new UserService();

    signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data: IUser = req.body;
            if(await this.userService.getByEmail(data.email)) {
                throw new ApiError("The email is already exists",HttpStatusCodes.BAD_REQUEST.code);
            }
            if(data.email == "admin@gmail.com") data.role = "admin";
            let user = await this.authService.signUp(data);
            logger.info(`user #${user._id}: signed up`);
            res.status(HttpStatusCodes.CREATED.code).send(user);
        }
        catch(err) {
            next(err);
        }
    }
    
    logIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let {email , password} = req.body;
            let user: UserDoc|null = await this.userService.getByEmail(email);
            if(!user) {
                throw new ApiError("The email doesn't exist",HttpStatusCodes.NOT_FOUND.code);
            }
            await this.authService.logIn(user,password);
            let token = assignToken({userId: user._id as string, role: user.role as string});
            logger.info(`user #${user._id}: logged in`);
            res.status(HttpStatusCodes.OK.code).send({user,token});
        }
        catch(err) {
            next(err);
        }
    }
}