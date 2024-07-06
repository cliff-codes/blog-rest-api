import express from 'express';
import { getABlog, getAllBlogs, postABlog, updateBlog, deleteBlog, getMyBlogs } from '../controllers/blogController.js';
import { verifyAccessToken } from '../utils/verifyToken.js';


const router = express.Router();

router.post("/create", verifyAccessToken, postABlog)
router.get("/", getAllBlogs)
router.get("/my/:id",verifyAccessToken, getMyBlogs)
router.get("/:id", getABlog).post("/:id",verifyAccessToken, updateBlog)
router.delete("/:id", verifyAccessToken ,deleteBlog)




export default router