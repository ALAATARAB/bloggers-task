import mongoose from 'mongoose';
import IModel from "../interfaces/model.interface";
import { ObjectId } from "mongodb";


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
        return resource
    }

    update = async (id: string, data: Partial<T>) => {
        const resource = await this.model.findByIdAndUpdate(new ObjectId(id),data,{new:true});
        return resource;
    }

    delete = async (id: string): Promise<T> => {
        return await this.model.findByIdAndDelete(new ObjectId(id))
    }

}