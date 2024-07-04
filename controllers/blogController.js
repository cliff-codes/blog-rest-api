import { Blog } from "../models/blogModel.js"
import { errorHandler } from "../utils/errorHandler.js"

export const postABlog = async(req, res, next) => {
    const {title, content} = req.body
    if(!title || !content) return(next(400, "The following feilds are required : title, content"))

    const author = req.user.id

    try {
        const newBlog = await Blog.create({
            title,
            content,
            author
        })
        await newBlog.save()
        await res.status(201).json(newBlog)
        
    } catch (error) {
        next(errorHandler(500, "Error creating blog"))
    }
}

export const getAllBlogs = async(req, res, next) => {
    try {
        const allBlogs = await Blog.find()
        await res.json(allBlogs)
        
    } catch (error) {
        next(errorHandler(500, "Error fetching blogs"))
    }
}