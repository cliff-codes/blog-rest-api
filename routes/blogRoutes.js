import express from 'express';
import { getABlog, getAllBlogs, postABlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { verifyAccessToken } from '../utils/verifyToken.js';


const router = express.Router();

router.post("/create", verifyAccessToken, postABlog)
router.get("/", getAllBlogs)
router.get("/:id", getABlog).post("/:id",verifyAccessToken, updateBlog)
router.delete("/:id", verifyAccessToken ,deleteBlog)




export default router