import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProductStore = create((set,get) => ({       
  loading: false,
  products:[],
  setProducts:(products)=>{
    set({products})
  },

  createProduct: async (productData) => {
    try {
      set({ loading: true });

      const response = await axios.post("/api/products", productData);
      toast.success("Product created successfully");
      console.log(get().products)
    } catch (error) {
      toast.error("Error creating product");
      console.error("Error creating product", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  fetchAllProducts:async()=>{
    const response = await axios.get('/api/products')
    set((state)=>({
        products:[response.data]
    }))
    console.log(get().products)
    return response.data
  },

  deleteProduct:async(productId)=>{
    try{
      await axios.post(`/api/products/${productId}`)
      toast.success("Product Deleted")
    }catch(err){
      console.log("deleteProduct->",err.message)
      toast.err("Error deleting product")
    }
  },

  fetchAllProductByCagegory: async(category)=>{
    const response = await axios.get(`/api/products/category/${category}`)
    console.log(response)
    return response
  }
}));