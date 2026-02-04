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

server.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

server.use(cookieParser())
server.use(express.json({ limit: "10mb" }))

//dotenv variables
const port = process.env.PORT || 5174


//these are the routes
server.use("/api/auth", authRoute)
server.use("/api/products", productRoute)
server.use("/api/cart", cartRoute)

await connectDB()
server.listen(port,'0.0.0.0',() => {
  console.log("Server running on http://0.0.0.0:3000/")
})
