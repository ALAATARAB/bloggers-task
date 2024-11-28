import mongoose from 'mongoose';
import IModel from "../interfaces/model.interface";
import { ObjectId } from "mongodb";
import ApiError from '../utils/api-error';
import { HttpStatusCodes } from '../utils/httpStatusCodes';

/**
 * implement all the basic functionality
 * make it generic
 */
export default class BaseService<T>{

    model: mongoose.Model<any, any>
    constructor(Imodel: IModel){
        this.model = Imodel.model
    }

    post = async (data: T) => {
        const resource = await this.model.create(data)
        return resource
    }

    get = async (filters = {}): Promise<T[]> =>{
        const resource = await this.model.find(filters) as T[]
        return resource
    }

    getById = async (id: string): Promise<T> => {
        const resource = await this.model.findOne(new ObjectId(id)) as T;
        if(!resource) throw new ApiError("There is no resource like this",HttpStatusCodes.NOT_FOUND.code);
        return resource
    }
    
    update = async (id: string, data: Partial<T>) => {
        const resource = await this.model.findByIdAndUpdate(new ObjectId(id),data,{new:true});
        if(!resource) throw new ApiError("There is no resource like this",HttpStatusCodes.NOT_FOUND.code);
        return resource;
    }
    
    delete = async (id: string): Promise<T> => {
        const resource = await this.model.findByIdAndDelete(new ObjectId(id))
        if(!resource) throw new ApiError("There is no resource like this",HttpStatusCodes.NOT_FOUND.code);
        return resource;
    }

}