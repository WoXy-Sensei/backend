import { Request, Response, NextFunction } from 'express';

class testMiddlewares {
    static async testMiddleware(req: Request, res: Response, next: NextFunction) {
        console.log('testMiddleware');
        next();
    }
}

export default testMiddlewares;
