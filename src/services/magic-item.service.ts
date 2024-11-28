import  MagicItemModel from "../models/magic-item.model";
import BaseService from "./base.service";
import MagicItemDoc from "../interfaces/magic-item.interface";
import { autoInjectable } from "tsyringe";

/**
 * provide the MagicItemService with all the functionality we need
 */
@autoInjectable()
export default class MagicItemService extends BaseService<MagicItemDoc> {
    
    constructor(Imodel: MagicItemModel) {
        super(Imodel);
    }
}