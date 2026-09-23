import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            success: false,
            message : "no token provided"
        })
    }
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.userId = decoded.userId;
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "Invalid or expired token"
        })
    }
    
    
    next()
}

export default authMiddleware;