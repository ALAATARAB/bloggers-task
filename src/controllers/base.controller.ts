import { NextFunction, Request, Response } from "express";
import BaseService from "../services/base.service";
import ApiError from "../utils/api-error";

export default class BaseController{

    service: BaseService<any>
    constructor(service: BaseService<any>){
        this.service = service
    }

    post = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const resource = await this.service.post(req.body)
            res.status(201).send(resource)
        }
        catch(err) {
            next(err);
        }
    }

    get = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const resource = await this.service.get()
            res.status(200).send(resource)
        } catch (err) {
            next(err);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const resource = await this.service.getById(id)
            if(resource === null){
                throw new ApiError("There is no resource like that", 404);
            }
            res.status(200).send(resource);
        } catch (err) {
            next(err)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const resource = await this.service.update(id,data);
            if(resource === null){
                throw new ApiError("There is no resource like that", 404);
            }
            res.status(200).send(resource);
        } catch (err) {
            next(err);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const resource = await this.service.delete(id)
            res.status(200).send(resource);
        } catch (err) {
            next(err)
        }
    }

} 