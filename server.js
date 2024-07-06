import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import userRouter  from "./routes/userRoutes.js"
import blogRouter  from "./routes/blogRoutes.js"


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


//------------ routes -------------------------------------------------------------------
server.use("/api/v1/users",  userRouter)
server.use("/api/v1/blogs" ,blogRouter)



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

