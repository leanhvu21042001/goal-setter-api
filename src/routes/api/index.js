import { Router } from 'express';
import goalRoutes from './goal.routes';

const router = Router();

router.use('/goals', goalRoutes);

export default router;
