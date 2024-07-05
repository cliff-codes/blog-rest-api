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
    console.log("get all blogs")
    try {
        const allBlogs = await Blog.find()
        await res.json(allBlogs)
        
    } catch (error) {
        next(errorHandler(500, "Error fetching blogs"))
    }
}

export const getABlog = async(req, res, next) => {
    const {id} = req.params
    console.log(`This is the blog id ${id}`)
    if(!id) return next(errorHandler(400, "id required"))

    try {
        const blog = await Blog.findById(id)
        if(!blog) return next(errorHandler(404, "Blog not found"))

        await res.status(200).json(blog)
        
    } catch (error) {
        next(errorHandler(500, "Error fetching blog"))
    }
}