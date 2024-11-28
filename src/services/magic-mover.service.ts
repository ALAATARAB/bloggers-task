import ApiError from "../utils/api-error";
import { autoInjectable } from "tsyringe";
import BaseService from "./base.service";
import MagicMoverDoc, { IMagicMover, magicMoverStates } from "../interfaces/magic-mover.interface";
import MagicItemService from "./magic-item.service";
import { IMagicItem } from "../interfaces/magic-item.interface";
import MagicMoverModel from "../models/magic-mover.model";
import { HttpStatusCodes } from "../utils/httpStatusCodes";

@autoInjectable()
export default class MagicMoverService extends BaseService<MagicMoverDoc> {
    magicItemService: MagicItemService;

    constructor(Imodel: MagicMoverModel, magicItemService: MagicItemService) {
        super(Imodel);
        this.magicItemService = magicItemService;
    }

    /**
     * get all the movers sorted by completed Missions (desc)
     */
    getActiveMovers = async () : Promise<IMagicMover> => {
        const movers = await this.model.find({},{name:1,completedMissions:1},{sort:{completedMissions:-1}});
        return movers;
    }

    /**
     * check if the magic mover isn't in a mission
     * load the magic mover with magic items if the weight limit of the mover greater than
     * or equal to the weight sum of the magic items
     */
    loadMagicItems = async (magicMoverId: string, magicItemIds: string[]) : Promise<IMagicMover> => {
        try {
            const magicMover: IMagicMover = await this.getById(magicMoverId);
            
            if(magicMover.state === magicMoverStates.OnMission)
                throw new ApiError(`The Mover ${magicMoverId} is already on a mission`,HttpStatusCodes.BAD_REQUEST.code);
    
            let usedWeight = magicMover.usedWeight;
            
            for (const magicItemId of magicItemIds) {
                const magicItem:IMagicItem = await this.magicItemService.getById(magicItemId);
                
                if(!magicItem)
                    throw new ApiError('There is no resource like that',HttpStatusCodes.NOT_FOUND.code);

                usedWeight += magicItem.weight;
                
                if(usedWeight > magicMover.weightLimit)
                    throw new ApiError(`There is no available weight to load all the items on this mover ${magicMoverId}`,HttpStatusCodes.BAD_REQUEST.code);
            }

            return await this.model.findByIdAndUpdate(magicMoverId,{usedWeight,state:magicMoverStates.Loading},{new:true}) as IMagicMover;
        } catch (err: any) {
            throw new ApiError(err.message,err.statusCode);
        }
    }

    /**
     * check if the mover in the loading state
     * start the mission
     */
    startAMission = async (magicMoverId: string) : Promise<IMagicMover> => {
        try {
            const magicMover: IMagicMover = await this.getById(magicMoverId);
            
            if(magicMover.state !== magicMoverStates.Loading)
                throw new ApiError(`The Mover ${magicMoverId} is not in the loading state`,HttpStatusCodes.BAD_REQUEST.code);
            
            return await this.model.findByIdAndUpdate(magicMoverId,{state:magicMoverStates.OnMission},{new:true}) as IMagicMover;
        } catch (err: any) {
            throw new ApiError(err.message,err.statusCode||HttpStatusCodes.NOT_FOUND.code);
        }
    }

    /**
     * check if the mover was in a mission
     * end the mission
     */
    endAMission = async (magicMoverId: string) : Promise<IMagicMover> => {
        try {
            const magicMover: IMagicMover = await this.getById(magicMoverId);

            if(magicMover.state !== magicMoverStates.OnMission)
                throw new ApiError(`The Mover ${magicMoverId} is not on a mission`,HttpStatusCodes.BAD_REQUEST.code);
            
            const completedMissions = magicMover.completedMissions + 1;
    
            return await this.model.findByIdAndUpdate(magicMoverId,{state:magicMoverStates.Resting,completedMissions,usedWeight:0},{new:true}) as IMagicMover;
        } catch (err: any) {
            throw new ApiError(err.message,err.statusCode);
        }
    }
}