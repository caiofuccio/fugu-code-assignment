import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

const main = async (port: number) => {
    try {
        const app = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors());
        app.use(routes);

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
