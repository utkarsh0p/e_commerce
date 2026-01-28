import express from "express"
import { 
    getAllProduct,
    createProduct,
    deleteProduct,
    getProductByCategory,
    
 } from "../controllers/product.controller.js"
import { protectedRoute , adminRoute} from "../middlewares/auth.middleware.js"
const route = express.Router()

route.get("/", protectedRoute, adminRoute, getAllProduct)
route.post("/", protectedRoute, adminRoute, createProduct)
route.post("/:id", protectedRoute, adminRoute, deleteProduct)
route.get("/category/:category",getProductByCategory )

export default route