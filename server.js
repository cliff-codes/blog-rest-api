import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import userRouter  from "./routes/userRoutes.js"
import blogRouter  from "./routes/blogRoutes.js"
import commentRouter from "./routes/commentRoutes.js"
import imageRouter from "./routes/fileUploadRoute.js"
import { verifyEmail } from "./controllers/userController.js";
import cors from 'cors'


configDotenv({path: ".env.local"});
const server = express();
const port = process.env.PORT || 3000;
const url = `mongodb+srv://simplecodes2580:${process.env.DATABASE_PASSWORD}@cluster0.ozi5o3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

//connect to DB
mongoose.connect(url)
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.error("Connection error:", err)); 


//------------ general configuration ----------------------------------------------------
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//add cors origin setup
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
};
server.use(cors(corsOptions));




//------------ routes -------------------------------------------------------------------
server.use("/api/v1/users",  userRouter)
server.use("/api/v1/blogs" ,blogRouter)
server.use("/api/v1/comments", commentRouter)
server.use("/verifyEmail/:emailVerificationToken", verifyEmail)
server.use("/api/v1/images", imageRouter)



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

