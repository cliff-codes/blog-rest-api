import { errorHandler } from "../utils/errorHandler.js"
import  bcryptjs  from "bcryptjs"
import { User } from "../models/userModel.js"

//create user
export const createUser = async(req, res, next) => {
    const {username, email, password } = req.body
    
    const salt = bcryptjs.genSaltSync(10)
    const hashedPassword = bcryptjs.hashSync(password, salt)
    
    try {
        //save user in DB
        const newUser = await User.create({username, email, password : hashedPassword})
        await newUser.save()
        //return all deatails of newUser but the password
        await res.status(201).json({...newUser._doc, password: undefined})

    } catch (error) {
        next(errorHandler(503, "Signing up failed"))
    }
}



