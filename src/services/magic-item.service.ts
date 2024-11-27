import  MagicItemModel from "../models/magic-item.model";
import BaseService from "./base.service";
import IMagicItemDoc from "../interfaces/magic-item.interface";
import { autoInjectable } from "tsyringe";


@autoInjectable()
export default class MagicItemService extends BaseService<IMagicItemDoc> {
    
    constructor(Imodel: MagicItemModel) {
        super(Imodel);
    }
}