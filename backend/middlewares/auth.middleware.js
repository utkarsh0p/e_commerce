import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

//protected route is basically telling if the user is valid or not
export const protectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized - no access token" })
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    )
    const user = await User.findById(decoded.userId)

    req.user = user
    next()

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}

//to check if the user is admin or not
export const adminRoute = async (req, res, next)=>{
    try{
        if(req.user.role !== 'admin'){
            res.json({message:"only admins are allowed to this route"})
            return;
        }
        next()
    }catch(err){
        console.log(err.message)
        res.json({message:err.message})
    }
}