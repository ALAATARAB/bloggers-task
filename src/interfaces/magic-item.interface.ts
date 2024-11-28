import mongoose from "mongoose"

export interface IMagicItem  {
    name: string,
    weight: number
};

export default interface MagicItemDoc extends IMagicItem, mongoose.Document{};