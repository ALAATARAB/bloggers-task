import MagicItemService from "../services/magic-item.service";
import { autoInjectable } from "tsyringe";
import BaseController from "./base.controller";

@autoInjectable()
export default class MagicItemController extends BaseController {
    constructor(service: MagicItemService) {
        super(service);
    }
}