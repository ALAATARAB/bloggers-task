import { createLogger, transports, format } from 'winston';
import 'winston-mongodb';

const logger = createLogger({
    transports: [
        new transports.MongoDB({
            level: 'info',
            db: process.env.MONGO_URL || 'mongodb://localhost:27017/task',
            collection: 'logs',
            format: format.json()
        })
    ]
})

export default logger;