import { Request, Response, Router } from 'express';
import { OpenAIService } from '../services/OpenAIService';
import { EmailDataType } from '../types/EmailDataType';

export const analyzeEmailRouter = Router();

analyzeEmailRouter.post('/', async (request: Request, response: Response) => {
    const authorization = request.headers['authorization'];
    const { emailText } = request.body;
    const { AUTHENTICATION_TOKEN } = process.env;

    if (!authorization || authorization != AUTHENTICATION_TOKEN) {
        response.status(401).send('Not authorized request');
    }

    try {
        const analyzedEmailData: EmailDataType =
            await OpenAIService.getEmailAnalyzedData(emailText);

        response.status(200).json(analyzedEmailData);
    } catch (error) {
        response.status(500).end();
    }
});
