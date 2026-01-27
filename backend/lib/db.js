import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const mongo_uri = process.env.MONGO_URI

const connectDB = async()=>{
    try{
        await mongoose.connect(mongo_uri)
        .then(()=>console.log("Connected to db",mongo_uri))
    }catch(error){
        console.log(error)
    }
}

export default connectDB