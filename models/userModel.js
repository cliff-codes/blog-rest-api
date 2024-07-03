import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetToken: String,
    resetTokenExpiration: Date
}, {timestamps: true})

export const User = mongoose.model('User', UserSchema);