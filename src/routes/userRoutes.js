import { Router } from "express";
import { getUserById, updateUser } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();


router.put('/:id', authenticate, updateUser);
router.get('/:id', authenticate, getUserById);

export default router;