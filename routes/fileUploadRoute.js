import express from "express"
import { uploadImage } from "../fileStorage/imagesStorage.js"
import multer from "multer"
import { storage } from "../fileStorage/imagesStorage.js"


const router = express.Router()

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Only image files are allowed!"), false)
        }
        cb(null, true)
    }  // only accept image files
})

router.post("/uploadImg", upload.single("file") , uploadImage)

export default router