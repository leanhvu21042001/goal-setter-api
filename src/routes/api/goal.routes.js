import { Router } from 'express';
import {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} from '@/controllers/goal.controller';
import { protect } from '@/middlewares/auth.middleware';

const router = Router();

router.route('/').get(protect, getGoals).post(protect, setGoals);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

export default router;
