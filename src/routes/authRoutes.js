import { Router } from 'express';
import { changePassword, login, register } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.post('/register',register);
router.post('/login', login);
router.post('/change-password', authenticate, changePassword);


export default router;