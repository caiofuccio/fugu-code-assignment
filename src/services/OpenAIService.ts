import { OpenAI } from 'openai';
import { EmailDataType } from '../types/EmailDataType';

export class OpenAIService {
    private static instance: OpenAIService;
    static client: OpenAI;

    static async initialize() {
        const { OPENAI_API_KEY } = process.env;

        try {
            this.client = new OpenAI({
                apiKey: OPENAI_API_KEY,
            });

            return this.instance;
        } catch (error) {
            throw new Error(`Unable to connect with OpenAI: ${error}`);
        }
    }

    static async getInstance() {
        this.instance = this.instance || (await this.initialize());
        return this.instance;
    }

    private static async createsOpenAICompletion(prompt: string) {
        if (!this.client) this.getInstance();

        try {
            return this.client.chat.completions
                .create({
                    messages: [{ role: 'user', content: prompt }],
                    model: 'gpt-4o-mini',
                })
                .then((response) => response.choices[0].message.content);
        } catch (error) {
            throw new Error(`Unable to connect with OpenAI: ${error}`);
        }
    }

    static async getEmailSummary(email: string) {
        const prompt = `Create a summarization of the following email as an email subject, does not include "Subject:": "${email}"`;
        return this.createsOpenAICompletion(prompt);
    }

    static async getEmailSentiment(email: string) {
        const prompt = `With only one word, positive, negative or neutral, classify the tone of the following email: "${email}"`;
        return this.createsOpenAICompletion(prompt).then((response) =>
            response?.toLowerCase(),
        );
    }

    static async isEmailAwaitingResponse(email: string) {
        const prompt = `With only true or false, analyze if the following email is expecting an answer from the receiver: "${email}"`;
        return this.createsOpenAICompletion(prompt).then(
            (response) => response?.toLowerCase() === 'true',
        );
    }

    static async getEmailAnalyzedData(email: string): Promise<EmailDataType> {
        try {
            const summary =
                (await this.getEmailSummary(email)) || 'unable to get summary';
            const sentiment = await this.getEmailSentiment(email);
            const awaitingResponse = await this.isEmailAwaitingResponse(email);

            return {
                summary,
                sentiment,
                awaitingResponse,
            };
        } catch (error) {
            throw new Error(`Unable to get the email data: ${error}`);
        }
    }
}
