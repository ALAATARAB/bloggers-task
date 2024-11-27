import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { autoInjectable } from "tsyringe";
import BaseController from "./base.controller";
import MagicMoverService from "../services/magic-mover.service";
import { IMagicMover } from "../interfaces/magic-mover.interface";



@autoInjectable()
export default class MagicMoverController extends BaseController {
    magicMoverService: MagicMoverService;

    constructor(magicMoverService: MagicMoverService) {
        super(magicMoverService);
        this.magicMoverService = magicMoverService
    }

    getMostActiveMovers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const magicMovers = await this.magicMoverService.getActiveMovers();
            res.status(200).json({message:"Magic Mover Found",magicMovers});
        } catch (err) {
            next(err);
        }
    }

    loadItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const magicMoverId: string = req.body.id;
            const magicItemIds: string[] = req.body.itemIds;
            const magicMover: IMagicMover = await this.magicMoverService.loadMagicItems(magicMoverId,magicItemIds);
            logger.info(`Magic mover with id ${magicMoverId} is in the Loading State`,{state: "Loading"});
            res.status(200).json({message:"Magic Mover Loaded Successfully",magicMover});
        } catch (err) {
            next(err);
        }
    }

    startMission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const magicMoverId: string = req.params.id;
            const magicMover: IMagicMover = await this.magicMoverService.startAMission(magicMoverId);
            logger.info(`Magic mover with id ${magicMoverId} is in the On_Mission State`, {state: "On_Mission"});
            res.status(200).json({message:"Magic Mover On a Mission Now",magicMover});
        } catch (err) {
            next(err);
        }
    }

    endMission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const magicMoverId: string = req.params.id;
            const magicMover: IMagicMover = await this.magicMoverService.endAMission(magicMoverId);
            logger.info(`Magic mover with id ${magicMoverId} is in the Resting State`,{state: "Resting"});
            res.status(200).json({message:"Magic Mover On Resting Mode",magicMover});
        } catch (err) {
            next(err);
        }
    }
}