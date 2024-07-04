import express from 'express';
import { postABlog } from '../controllers/blogController.js';


const router = express.Router();

router.post("/create", postABlog)


export default router