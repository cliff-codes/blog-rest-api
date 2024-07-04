import { errorHandler } from "./errorHandler.js"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"

configDotenv({path: ".env.local"})

export const verifyAccessToken = (req, res, next) => {
    const access_token = req.headers.authorization

    if(!access_token) return next(errorHandler(401, "Access Denied"))

    const valid_access_token = access_token.replace(`Bearer `, "")

    jwt.verify(valid_access_token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(401, "Expired Token"))
        req.user = user
        next()
    })

}