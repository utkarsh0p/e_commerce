import { create } from 'zustand'
import axios from '../lib/axios.js'

export const useUserStore = create((set, get) => ({
    loadingState:true,
    user:null,

    signup: async ({name, email, password})=>{
        try {
            const res = await axios.post("/api/auth/signup", {
                name,
                email,
                password
            })

            set({user:res.data.user})
            set({loadingState:false})
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message)
            set({loadingState:false})
            throw error
        }
    }
}))
