import mongoose from "mongoose"

export default interface IModel{
    schema: mongoose.Schema<any>
    model: mongoose.Model<any, any>
}