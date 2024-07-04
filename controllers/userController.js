import { errorHandler } from "../utils/errorHandler.js"
import  bcryptjs  from "bcryptjs"
import { User } from "../models/userModel.js"
import { configDotenv } from "dotenv"
import jwt from "jsonwebtoken"


configDotenv({path: ".env.local"})

//------------------------create a new user---------------------

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




//-----------------------login user-------------------------------

export const loginUser = async (req, res, next) => {
    const {email, password} = req.body


    if(!email || !password) return next(errorHandler(400, "The following fields are required: email, password"))

    try {
        const user = await User.find({email})

        if(!user) return next(errorHandler(404, "User does not exist"))
        
        //compare password
        const isEqual = bcryptjs.compareSync(password, user[0].password)
        if(!isEqual) return next(errorHandler(401, "Invalid credentials"))
        
        //generate a jwt-token
        const token = jwt.sign({id: user[0]._id}, process.env.JWT_SECRET)
        console.log(token)

        //cookie expires in
        const expiryDate = new Date(Date.now() + 3600000)
        console.log(expiryDate)

        //return user_details without the password
        res.cookie("access_token", token, { httpOnly: true , expires: expiryDate}).status(200).json({...user[0]._doc, password: undefined})
        
    } catch (error) {
        console.log(error)
        next(errorHandler(503, "Login failed"))
    }
}

//-----------------------logout user--------------------------------
export const logoutUser = async(req, res) => {
    res.clearCookie("access_token").status(200).json("Logged out successfully")
}
