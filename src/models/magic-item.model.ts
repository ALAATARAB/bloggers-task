import mongoose, { Model, model } from 'mongoose';
import IModel from '../interfaces/model.interface';
import IMagicItemDoc from '../interfaces/magic-item.interface';
import { singleton } from 'tsyringe';

@singleton()
export default class MagicItemModel implements IModel {
    schema: mongoose.Schema<any> = new mongoose.Schema({
        name: {
            type:String,
            required:true
        },
        weight: {
            type: Number,
            required:true
        }
    });
    model: Model<any, any> = model<IMagicItemDoc>('MagicItem',this.schema);
    
}