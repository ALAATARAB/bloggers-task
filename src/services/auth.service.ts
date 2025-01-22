import IUser from "../interfaces/user.interface";
import { Document } from "mongoose";
import UserModel from "../models/user.model";
import bcryptjs from "bcryptjs";
import { HttpStatusCodes } from "../utils/httpStatusCodes";

export type UserDoc = (Document & IUser);

export default class AuthService {
    
    signUp = async (user: IUser) : Promise<UserDoc> => { 
        let hashedPassword = await bcryptjs.hash(user.password,12);
        user.password = hashedPassword;
        let userDoc:UserDoc = await UserModel.create(user);
        userDoc.password = '$';
        return userDoc;
    }

    logIn = async (user: UserDoc, enteredPassword: string) : Promise<boolean> => {
        let verify = await bcryptjs.compare(enteredPassword,user.password);
        if (!verify) throw {message:'The password isn\'t correct',statusCode:HttpStatusCodes.UNAUTHORIZED.code};
        user.password = '$';
        return true;
    }
}