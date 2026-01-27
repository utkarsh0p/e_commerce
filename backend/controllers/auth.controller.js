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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: "invalid credentials" })
    }

    const pass = await user.comparePassword(password)
    if (!pass) {
      return res.json({ message: "invalid credentials" })
    }

    const {refreshToken, accessToken } = generateTokens(user._id)
    storeRefreshToken(user._id, refreshToken)
    setCookie(res, accessToken, refreshToken)

    res.json({
    message: "user logged in successfully",
    user: {
        _id: user._id,
        name: user.name,
        email: user.email
    }
    })
  
  } catch (err) {
    console.log(err)
    res.json({ message: `error -> ${err}` })
  }
}


export const logout =  async (req, res)=>{
    try{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            res.json({"message":"there no user logged in or signed up"})
            return
        }
        //decoding the refreshtoken to get the userid
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        //using the userid to delete refresh token from the redis
        await redis.del(`refreshToken:${decoded.userId}`)
        //clearing from the cookies also
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        
        res.json({"message":"logged out succesfully"})

    }catch(err){
        console.log(err)
        res.json({"message":`error->${err}`})
    }
}



