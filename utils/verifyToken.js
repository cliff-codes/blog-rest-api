import { errorHandler } from "./errorHandler"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"

configDotenv({path: ".env.local"})

export const verifyAccessToken = (req, res, next) => {
    const access_token = req.params.access_token

    if(!access_token) return next(errorHandler(401, "Access Denied"))

    jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(401, "Access Denied"))
        req.user = user
        next()
    })
}