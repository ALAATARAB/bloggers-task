import mongoose, { Model, model } from 'mongoose';
import IModel from '../interfaces/model.interface';
import { singleton } from 'tsyringe';
import IMagicMoverDoc, { magicMoverStates } from '../interfaces/magic-mover.interface';

@singleton()
export default class MagicMoverModel implements IModel {
    schema: mongoose.Schema<any> = new mongoose.Schema({
        name: {
            type:String,
            required:true
        },
        weightLimit: {
            type: Number,
            required:true
        },
        usedWeight: {
            type: Number,
            default: 0
        },
        completedMissions: {
            type: Number,
            default: 0
        },
        state: {
            type: String,
            enum: magicMoverStates,
            default: magicMoverStates.Resting
        }
    });
    model: Model<any, any> = model<IMagicMoverDoc>('MagicMover',this.schema);
    
}