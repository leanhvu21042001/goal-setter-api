import { Router } from 'express';
import goalRoutes from './goal.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/goals', goalRoutes);
router.use('/users', userRoutes);

export default router;
