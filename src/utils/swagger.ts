import { Express, Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bloggers 🤳🏻",
            version: "1.0.0",
            description: "Api Doc for End-Points"
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
    /**
     * Api docs with swaggerUi
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