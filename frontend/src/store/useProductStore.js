import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProductStore = create((set,get) => ({       
  loading: false,
  products:[],
  error: null,
  setProducts:(products)=>{
    set({products})
  },

  createProduct: async (productData) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.post("/api/products", productData);
      // Add new product to local state
      set((state) => ({
        products: [...state.products, response.data],
        loading: false
      }));
      toast.success("Product created successfully");
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Error creating product" });
      toast.error(error.response?.data?.message || "Error creating product");
      console.error("Error creating product", error);
      throw error;
    }
  },
  fetchAllProducts:async()=>{
    try {
      set({ loading: true, error: null });
      const response = await axios.get('/api/products');
      set({ products: response.data.products || [], loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Failed to fetch products" });
      toast.error(error.response?.data?.message || "Failed to fetch products");
      return { products: [] };
    }
  },

  deleteProduct:async(productId)=>{
    const previousProducts = get().products;
    try{
      // Optimistic update - remove product from local state
      set((state) => ({
        products: state.products.filter(p => p._id !== productId)
      }));
      
      await axios.post(`/api/products/${productId}`);
      toast.success("Product Deleted");
    }catch(err){
      // Rollback on error
      set({ products: previousProducts });
      console.log("deleteProduct->",err.message);
      toast.error(err.response?.data?.message || "Error deleting product");
    }
  },

  fetchAllProductByCagegory: async(category)=>{
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`/api/products/category/${category}`);
      set({ loading: false });
      return response;
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Failed to fetch products" });
      toast.error(error.response?.data?.message || "Failed to fetch products");
      return { data: { product: [] } };
    }
  }
}));