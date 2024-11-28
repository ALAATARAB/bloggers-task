import mongoose from "mongoose";

export enum magicMoverStates {
    Resting= "Resting",
    Loading= "Loading",
    OnMission= "On-Mission"
}

export interface IMagicMover {
    name: string,
    weightLimit: number,
    usedWeight: number,
    completedMissions: number,
    state: magicMoverStates
}
/**
 * 
 */
export default interface MagicMoverDoc extends IMagicMover, mongoose.Document{};