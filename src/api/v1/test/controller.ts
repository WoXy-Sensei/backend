import { Response, Request } from 'express';
import testService from './service';
import BadRequestError from '@root/errors/BadRequestError';

class testController {
    async createTest(req: Request, res: Response) {
        throw new BadRequestError({
            message: 'This is a test error',
        });
    }
}
export default new testController();
