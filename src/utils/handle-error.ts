import { NextFunction, Request, Response } from "express";
import ApiError from "./api-error";

const handleError = (err: ApiError, req:Request, res:Response, next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({message:err.message});
};

export default handleError;