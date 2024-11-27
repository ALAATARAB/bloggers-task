import { Express, Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "🚀 Magic Transporters 🚀",
            version: "1.0.0",
            description: "An Api Doc for End-Points"
        },
    },
    apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
    /**
     * 
     */
    app.use('/api/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    /**
     * To get all the info about the api
     */
    app.get('/api/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type','application/json');
        res.send(swaggerSpec);
    });
    
}

export default swaggerDocs;