import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../errors/BaseError';
import { logger } from '../utils';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof BaseError) {
        const { statusCode, errors, logging } = err;
        const errorDetails = {
            code: statusCode,
            errors: errors,
            stack: err.stack,
        };

        if (logging || process.env.NODE_ENV === 'dev') {
            console.error(JSON.stringify(errorDetails, null, 2));
            logger.logErrorToFile(errorDetails);
        }

        res.status(statusCode).send({ errors });
        return;
    }

    console.error(JSON.stringify(err, null, 2));
    res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
    return;
};
