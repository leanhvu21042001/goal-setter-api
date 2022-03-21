import { Router } from 'express';
import {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} from '@/controllers/goal.controller';

const router = Router();

router.route('/').get(getGoals).post(setGoals);
router.route('/:id').put(updateGoal).delete(deleteGoal);

export default router;
