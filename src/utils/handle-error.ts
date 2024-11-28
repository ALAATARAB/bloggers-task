import { NextFunction, Request, Response } from "express";
import ApiError from "./api-error";
import { HttpStatusCodes } from "./httpStatusCodes";

const handleError = (err: ApiError, req:Request, res:Response, next:NextFunction) => {
    err.statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR.code;
    res.status(err.statusCode).json({message:err.message});
};

export default handleError;