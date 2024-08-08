import { Router } from 'express';
import { analyzeEmailRouter } from './analyzeEmailRouter';

const router = Router();

router.use('/analyzeEmail', analyzeEmailRouter);

export default router;
