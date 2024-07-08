import express from "express"
import { postComment } from "../controllers/commentController.js"
import { verifyAccessToken } from "../utils/verifyToken.js"


const router = express.Router()

router.post('/add/:blogId', verifyAccessToken ,postComment)


export default router