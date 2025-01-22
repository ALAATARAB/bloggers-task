import { ObjectId } from "mongoose";
import IUser from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { Document } from "mongoose";

type UserDoc = (Document & IUser);

export default class UserService {
    
    getByEmail = async (email: string) : Promise<UserDoc|null> => {
        return await UserModel.findOne({email});
    }

    getById = async (id: ObjectId) : Promise<UserDoc|null> => {
        return await UserModel.findById(id);
    }
    
    promoteUser = async (userId: ObjectId) : Promise<UserDoc> => {
        return await UserModel.findByIdAndUpdate(userId, {role:'admin'}, {new:true}).select('-password') as UserDoc;
    }


}