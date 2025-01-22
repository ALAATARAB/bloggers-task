import dotenv from 'dotenv';
import mongoose from "mongoose";
import createServer from './utils/server';
const app = createServer();

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/task';

mongoose.connect(MONGO_URL).then(connection=> {
    app.listen(PORT,()=>{
        console.log(`server running on port: ${PORT}`);
    })
}).catch((err) => {console.log(err);});