import { Router } from 'express';

import { protect } from '@/middlewares/auth.middleware';
import { getMe, loginUser, registerUser } from '@/controllers/user.controller';

const router = Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
