import express from "express";
import { createUser, loginStatus, loginUser } from "../controllers/userController.js";
import { verifyAccessToken } from "../utils/verifyToken.js";


const router = express.Router();

router.post('/register', createUser) 
router.post('/login', loginUser) 
router.get('/status', verifyAccessToken, loginStatus)
router.get('/logout', loginStatus)





export default router
