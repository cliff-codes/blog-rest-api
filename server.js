import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";


configDotenv();
const server = express();
const port = process.env.PORT || 3000;
const url = `mongodb+srv://simplecodes2580:${process.env.DATABASE_PASSWORD}@cluster0.ozi5o3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

//connect to DB

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.error("Connection error:", err));

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
