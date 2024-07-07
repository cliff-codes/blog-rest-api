import {v2 as cloudinary} from "cloudinary"
import multer from "multer"
import { errorHandler } from "../utils/errorHandler.js"
import { configDotenv } from "dotenv"


configDotenv({ path: "../.env.local" });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

export const storage = multer.memoryStorage()


export const uploadImage = async (req, res, next) => {
    
    const file = req.file 
    console.log(file)
    if(!file) return next(errorHandler(400, "No image file found"))


    try {
        cloudinary.uploader.upload_stream(
            {resource_type: 'image'},
            (error, result) => {
                if(error) {
                    console.log(errorHandler)
                    return next(errorHandler(500, "Error uploading image"))
                }
                res.status(200).json(result.secure_url)
            }
            
        ).end(file.buffer)

    } catch (error) {
        next(errorHandler(500, "Error uploading image"))
    }
} 