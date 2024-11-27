import ApiError from "../utils/api-error";
import { autoInjectable } from "tsyringe";
import BaseService from "./base.service";
import IMagicMoverDoc, { IMagicMover, magicMoverStates } from "../interfaces/magic-mover.interface";
import MagicItemService from "./magic-item.service";
import { IMagicItem } from "../interfaces/magic-item.interface";
import MagicMoverModel from "../models/magic-mover.model";

@autoInjectable()
export default class MagicMoverService extends BaseService<IMagicMoverDoc> {
    magicItemService: MagicItemService;

    constructor(Imodel: MagicMoverModel, magicItemService: MagicItemService) {
        super(Imodel);
        this.magicItemService = magicItemService;
    }

    getActiveMovers = async () : Promise<IMagicMover> => {
        const movers = await this.model.find({},{name:1,completedMissions:1},{sort:{completedMissions:-1}});
        return movers;
    }

    loadMagicItems = async (magicMoverId: string, magicItemIds: string[]) : Promise<IMagicMover> => {
        try {
            const magicMover: IMagicMover = await this.getById(magicMoverId);
            
            if(magicMover.state === magicMoverStates.OnMission)
                throw new ApiError(`The Mover ${magicMoverId} is already on a mission`,400);
    
            let usedWeight = magicMover.usedWeight;
        
            for (const magicItemId of magicItemIds) {
                const magicItem:IMagicItem = await this.magicItemService.getById(magicItemId);
                
                usedWeight += magicItem.weight;
                
                if(usedWeight > magicMover.weightLimit)
                    throw new ApiError(`There is no available weight to load all the items on this mover ${magicMoverId}`,400);
            }

            return await this.model.findByIdAndUpdate(magicMoverId,{usedWeight,state:magicMoverStates.Loading},{new:true}) as IMagicMover;
        } catch (err: any) {
            throw new ApiError(err.message,404);
        }
    }

    startAMission = async (magicMoverId: string) : Promise<IMagicMover> => {
        try {
            const magicMover: IMagicMover = await this.getById(magicMoverId);
            if(magicMover.state === magicMoverStates.OnMission)
                throw new ApiError(`The Mover ${magicMoverId} is already on a mission`,400);
            
            if(magicMover.state === magicMoverStates.Resting)
                throw new ApiError(`The Mover ${magicMoverId} in the resting mode`,400);
    
            return await this.model.findByIdAndUpdate(magicMoverId,{state:magicMoverStates.OnMission},{new:true}) as IMagicMover;
        } catch (err: any) {
            throw new ApiError(err.message,err.statusCode);
        }
    }

    endAMission = async (magicMoverId: string) : Promise<IMagicMover> => {
        try {
            const magicMover: IMagicMover = await this.getById(magicMoverId);
    
            if(magicMover.state !== magicMoverStates.OnMission)
                throw new ApiError(`The Mover ${magicMoverId} is not on a mission`,400);
            
            const completedMissions = magicMover.completedMissions + 1;
    
            return await this.model.findByIdAndUpdate(magicMoverId,{state:magicMoverStates.Resting,completedMissions,usedWeight:0},{new:true}) as IMagicMover;
        } catch (err: any) {
            throw new ApiError(err.message,err.statusCode);
        }
    }
}