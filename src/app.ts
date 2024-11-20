import express, { Express, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { corsConfig, limiterConfig } from './settings';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errors';
import NotFoundError from './errors/NotFoundError';
import 'express-async-errors';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Express = express();
const version = process.env.API_VERSION || 'v1';

app.use(
    morgan(process.env.MORGAN_LOGGING || 'dev', {
        stream: require('fs').createWriteStream('./logs/access.log', { flags: 'w' }),
    })
);
app.use(helmet());
app.use(cors(corsConfig));
app.use(rateLimit(limiterConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});
app.use(`/api/${version}`, require(`./api/${version}`).default);
app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;
