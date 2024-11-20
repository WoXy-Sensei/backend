import express from 'express';
import testController from './controller';

const router = express.Router();

router.get('/', testController.createTest.bind(testController));

export default router;
