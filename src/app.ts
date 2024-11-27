import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express' 
import dotenv from 'dotenv';
import mongoose from "mongoose";
import mountRoutes from './routes/index.routes';
import ApiError from './utils/api-error';
import handleError from './utils/handle-error';
import swaggerDocs from './utils/swagger';
import cors from 'cors';
const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());

swaggerDocs(app);
mountRoutes(app);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(`There is no route like that: ${req.originalUrl}`, 404));
});

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/task';
app.use(handleError);

mongoose.connect(MONGO_URL).then(connection=> {
    app.listen(PORT,()=>{
        console.log(`server running on port: ${PORT}`);
    })
}).catch((err) => {console.log(err);});