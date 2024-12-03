import { Router } from "express";
import { createPost, deletePost, updatePost } from "../controllers/blogController.js";

const router = Router();

router.post('/create',createPost);
router.put('/update',updatePost);
router.delete('/delete',deletePost);



export default router;