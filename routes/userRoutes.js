import express from "express";
import { createUser, getUser, loginStatus, loginUser, logoutUser } from "../controllers/userController.js";
import { verifyAccessToken } from "../utils/verifyToken.js";


const router = express.Router();

router.post('/register', createUser).post("/logout", logoutUser)
router.post('/login', loginUser) 
router.get('/status', verifyAccessToken, loginStatus)
router.get('/:id', getUser)





export default router
