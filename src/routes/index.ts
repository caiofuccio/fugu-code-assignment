import { Router } from 'express';
import { analyzeEmailRouter } from './analyzeEmailRouter';

const router = Router();

router.use('/analyze-email', analyzeEmailRouter);

export default router;
