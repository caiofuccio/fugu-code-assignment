import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';

const main = async (port: number) => {
    try {
        const app = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        const corsOptions = {
            origin: 'https://caiofuccio.github.io',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'Content-Type,authorization',
        };

        app.use(cors(corsOptions));
        app.use(routes);

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

        app.listen(port || 8080, () =>
            console.log(`Server running on port ${port}`),
        );
    } catch (error) {
        throw new Error('Unable to start the server');
    }
};

(async () => {
    dotenv.config();
    const { PORT } = process.env;

    await main(Number(PORT));
})();
