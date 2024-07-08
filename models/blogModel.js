import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    upVotes: {
        type: Number,
        default: 0
    }, 
    downVotes: {
        type: Number,
        default: 0
    },  
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    coverImg: {
        type: String,
        default: null // will be populated with a default image from blogger.com
    },
    blogImgs: [{ type: String }]
})

export const Blog  = mongoose.model('Blog', blogSchema)