import express from "express";
import { createUser, loginStatus, loginUser } from "../controllers/userController.js";


const router = express.Router();

router.post('/register', createUser) 
router.post('/login', loginUser) 
router.get('/status', loginStatus)





export default router
