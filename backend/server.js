import dotenv from "dotenv"
dotenv.config()

//imports
import cookieParser from "cookie-parser"
import cors from 'cors'
import express, { json } from "express"
import userModel from "./models/user.model.js"

//file imports 
import authRoute from "./routes/auth.route.js"
import connectDB from "./lib/db.js"
import cartRoute from "./routes/cart.route.js"
import productRoute from "./routes/product.route.js"

//defining servers
const server = express()
server.use(cors())
server.use(cookieParser())
server.use(express.json())

//dotenv variables
const port = process.env.PORT || 5000


//these are the routes
server.use("/api/auth", authRoute)
server.use("/api/products", productRoute)
server.use("/api/cart", cartRoute)

console.log(userModel)
await connectDB()
server.listen(port, () => {
  console.log("Server running on http://localhost:5000/")
})
