import { Blog } from "../models/blogModel.js"
import { errorHandler } from "../utils/errorHandler.js"



//------------------------------create a new blog----------------------------------------------------
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




//------------------------------get all blogs----------------------------------------------------
export const getAllBlogs = async(req, res, next) => {
  
    try {
        const allBlogs = await Blog.find()
        await res.json(allBlogs)
        
    } catch (error) {
        next(errorHandler(500, "Error fetching blogs"))
    }
}




//------------------------------get a blog----------------------------------------------------
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




//------------------------------update a blog----------------------------------------------------
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




//------------------------------delete a blog----------------------------------------------------
export const deleteBlog = async(req, res, next) => {
    const {id} = req.params

    const blog = await Blog.findById(id)

    if(!blog) return next(errorHandler(404, "Blog not found"))

    if(blog.author.toString() !== req.user.id) return next(errorHandler(401, "Access denied. you cannot delete blog"))

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id)
        await res.status(200).json({ message: "Blog deleted successfully"})

    } catch (error) {
        next(errorHandler(500, "Error deleting blog"))
    }
}


//------------------------------geting a writers blogs--------------------
export const getMyBlogs = async (req, res, next) => {
    console.log(req.user)
    const id = req.user.id

    if(!id) return next(errorHandler(401, 'Access denied'))

    try {
        const blogs = await Blog.find({author: id})
        console.log(blogs)

        await res.status(200).json(blogs)
    } catch (error) {
        next(errorHandler(500, "Error getting blogs"))
    }
}


//-------------------------------upVote or like a blog/Article -------------------
export const upVote = async (req, res, next) => {
    
}