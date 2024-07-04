import express from 'express';
import { getAllBlogs, postABlog } from '../controllers/blogController.js';
import { verifyAccessToken } from '../utils/verifyToken.js';


const router = express.Router();

router.post("/create", verifyAccessToken, postABlog)
router.get("/", getAllBlogs)


export default router