import { Router } from "express";
import { createPost, curatePost, deletePost, flagOrUnflagPost, getAllBlogByUserId, updatePost } from "../controllers/blogController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { ADMIN_ROLE, MODERATOR_ROLE } from "../constants/commonConstants.js";

const router = Router();

router.post('',createPost);
router.patch('/:blogId', updatePost);
router.delete('/:blogId', authenticate, deletePost);
router.post('/:blogId/flag', authenticate, flagOrUnflagPost);
router.post('/get', authenticate, getAllBlogByUserId);
router.post('/:blogId/curate', authenticate, authorize([ADMIN_ROLE, MODERATOR_ROLE]), curatePost);


export default router;