import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import redis from '../lib/redis.js'


//generate tokens
const generateTokens = (userId) =>{
    const refreshToken = jwt.sign(
        {userId},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"7d"}
    )
    const accessToken = jwt.sign(
        {userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    )
    return {accessToken , refreshToken}
}

//store the refresh token in the redis
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refreshToken:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};


//cookie setting helper function
const setCookie =async (res, accessToken, refreshToken)=>{
    res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}



//the signup login and logout functions

export const signup = async (req, res)=>{
    const {name, email, password} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        res.json({"message":"user already exist"})
        return
    }
    const user = await User.create(
        {
            name:name,
            email:email,
            password:password
        }
    )

    //refresh and access tokens
    const {refreshToken, accessToken} = generateTokens(user._id)

    //storing the refresh token in the redis on signup
    storeRefreshToken(user._id, refreshToken)


    //also storing in the cookie
    setCookie(res, accessToken, refreshToken)
     
    res.json({user:{
        _id:user._id,
        name:user.name,
        email:user.email
    }}, {"message":"user created successfully"})
}

export const login = (req, res)=>{
    res.send("this is the login route from teh controller ")
}

export const logout = (req, res)=>{
    res.send("this is the logout route from teh controller ")
}



