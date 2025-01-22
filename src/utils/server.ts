import express, { Express, NextFunction, Request, Response } from "express";
import mountRoutes from '../routes/index.routes';
import ApiError from './api-error';
import handleError from './handle-error';
import swaggerDocs from './swagger';
import cors from 'cors';
import { HttpStatusCodes } from "./httpStatusCodes";

export default function createServer() : Express {
    const app = express();
    
    app.use(cors());
    app.use(express.json());

    /**
     * mount all the routes
     */
    mountRoutes(app);

    /**
     * mount the api docs
     */
    swaggerDocs(app);

    /**
     * not found url
     */
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new ApiError(`There is no route like that: ${req.originalUrl}`, HttpStatusCodes.NOT_FOUND.code));
    });
    
    app.use(handleError);

    return app;
}