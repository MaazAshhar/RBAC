import { Router } from "express";
import { createPost, curatePost, deletePost, flagOrUnflagPost, getAllBlogByUserId, getAllPost, updatePost } from "../controllers/blogController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { ADMIN_ROLE, MODERATOR_ROLE } from "../constants/commonConstants.js";

const router = Router();

router.post('', authenticate, createPost);
router.patch('/:blogId', authenticate, updatePost);
router.delete('/:blogId', authenticate, deletePost);
router.post('/:blogId/flag', authenticate, flagOrUnflagPost);
router.get('/get', authenticate, getAllBlogByUserId);
router.get('/get-all-post', authenticate, getAllPost);
router.post('/:blogId/curate', authenticate, authorize([ADMIN_ROLE, MODERATOR_ROLE]), curatePost);


export default router;