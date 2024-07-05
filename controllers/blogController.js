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

export const getABlog = async(req, res, next) => {
    const {id} = req.params

    if(!id) return next(errorHandler(400, "id required"))

    try {
        const blog = await Blog.findById(id)
        if(!blog) return next(errorHandler(404, "Blog not found"))

        await res.status(200).json(blog)
        
    } catch (error) {
        next(errorHandler(500, "Error fetching blog"))
    }
}




export const updateBlog = async(req, res, next) => {
    const {id} = req.params

    const blog = await Blog.findById(id)

    if(!blog) return next(errorHandler(404, "Blog not found"))

    if(blog.author.toString() !== req.user.id) return next(errorHandler(401, "Access denied. you cannot edit blog"))

    const {title, content} = req.body
    if(!title ||!content) return next(errorHandler(400, "Any of the following feilds are required : title, content"))

    console.log(req.user)
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            //set feilds in mongo Db object
            $set: {
                title,
                content
            },}, 
        {new: true})

        await res.status(201).json(updatedBlog)

    } catch (error) {
        next(errorHandler(500, "Error updating blog"))
    }
}