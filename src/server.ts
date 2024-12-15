import express, { NextFunction, Request, Response } from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config';
import v1Router from './routes/v1';
import { errorHandler } from './utils/error.handler';
import { ErrorHelper } from './utils/error.helper';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from './config/swagger';

dotenv.config();
const app = express();

// Configure the app to use Swagger
const swaggerOptions = {
    swaggerDefinition: swaggerDefinition, 
    apis: ['./src/routes/v1/*.ts']
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// JSON PARSER
app.use(bodyParser.json())

// CORS
app.use(cors({ origin: "*" }))

// All services in v1
app.use('/v1', v1Router);

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorHelper) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            details: err.details,
        });
    } else {
        console.error(err);
        res.status(500).json({
            status: err.statusCode,
            message: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? err.message : null,
        });
    }
});

// CUSTOM ERROR HANDLER
app.use(errorHandler);


// API SERVE
app.listen(config.server.port, () => {
    console.log(`Server running at http://${config.server.host}:${config.server.port}`)
    console.log(`API Documentation at http://${config.server.host}:${config.server.port}/api-docs`)
});
