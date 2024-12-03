import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

const router = Router();
router.post('/register',register);
router.get('/login', login);


export default router;