import { time } from '../utils';

export const corsConfig = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
};

export const limiterConfig = {
    windowMs: time.minToMilliseconds(15),
    max: 100,
};
