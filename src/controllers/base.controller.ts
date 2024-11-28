import { NextFunction, Request, Response } from "express";
import BaseService from "../services/base.service";
import ApiError from "../utils/api-error";
import { HttpStatusCodes } from "../utils/httpStatusCodes";

export default class BaseController{

    service: BaseService<any>
    constructor(service: BaseService<any>){
        this.service = service
    }

    post = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const resource = await this.service.post(req.body)
            res.status(HttpStatusCodes.CREATED.code).send(resource)
        }
        catch(err) {
            next(err);
        }
    }

    get = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const resource = await this.service.get()
            res.status(HttpStatusCodes.OK.code).send(resource)
        } catch (err) {
            next(err);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const resource = await this.service.getById(id)
            
            res.status(HttpStatusCodes.OK.code).send(resource);
        } catch (err) {
            next(err)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const resource = await this.service.update(id,data);
            
            res.status(HttpStatusCodes.OK.code).send(resource);
        } catch (err) {
            next(err);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const resource = await this.service.delete(id);
            
            res.status(HttpStatusCodes.OK.code).send(resource);
        } catch (err) {
            next(err)
        }
    }

} 