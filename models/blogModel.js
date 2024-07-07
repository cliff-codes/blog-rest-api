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
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    coverImg: {
        type: String,
        default: null // will be populated with a default image from blogger.com
    }
})

export const Blog  = mongoose.model('Blog', blogSchema)