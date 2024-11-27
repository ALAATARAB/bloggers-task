import mongoose from "mongoose"

export interface IMagicItem  {
    name: string,
    weight: number
};

export default interface IMagicItemDoc extends IMagicItem, mongoose.Document{};