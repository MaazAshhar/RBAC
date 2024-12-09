import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { createUser, deleteUser, banOrUnbanUser, getAllUser, promoteUser } from "../controllers/adminController.js";
import { authorize } from "../middlewares/authorize.js";
import { ADMIN_ROLE } from "../constants/commonConstants.js";

const router = Router();


router.post('/user/create', authenticate, authorize(ADMIN_ROLE), createUser);
router.delete('/user/delete/:userId', authenticate, authorize(ADMIN_ROLE), deleteUser);
router.post('/user/status', authenticate, authorize(ADMIN_ROLE), banOrUnbanUser);
router.get('/users', authenticate, authorize(ADMIN_ROLE), getAllUser);
router.post('/user/update-role', authenticate, authorize(ADMIN_ROLE), promoteUser);


export default router;