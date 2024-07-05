import express from 'express';
import { getABlog, getAllBlogs, postABlog } from '../controllers/blogController.js';
import { verifyAccessToken } from '../utils/verifyToken.js';


const router = express.Router();

router.post("/create", verifyAccessToken, postABlog)
router.get("/", getAllBlogs)
router.get("/:id", getABlog)


export default router