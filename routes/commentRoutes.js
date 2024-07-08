import express from "express"
import { editComment, postComment } from "../controllers/commentController.js"
import { verifyAccessToken } from "../utils/verifyToken.js"


const router = express.Router()

router.post('/add/:blogId', verifyAccessToken ,postComment)
router.patch('/edit/:commentId', verifyAccessToken, editComment)


export default router