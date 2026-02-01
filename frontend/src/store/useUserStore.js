import { create } from 'zustand'
import axios from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useUserStore = create((set, get) => ({
    loadingState:false,
    user:null,
    checkingAuth:false,

    signup: async ({name, email, password})=>{
        set({loadingState:true})
        try {
            const response = await axios.post("/api/auth/signup", {
                name,
                email,
                password
            })

            set({user:response.data.user})
            set({loadingState:false})
            toast.success("sign up success")
        } catch (error) {
            toast.error("sign up failed")
            console.error("Signup error:", error.response?.data || error.message)
            set({loadingState:false})
            throw error
        }
    },

    login: async({email,password})=>{
        set({loadingState:true})
        try{
            const response = await axios.post("/api/auth/login", {
                email,
                password
            })
            set({user:response.data.user})
            set({loadingState:false})
            toast.success("log in success")
        }catch(err){
            toast.error("log in failed")
            console.log(err.message)
        }
    },
    
    logout:async() =>{
        set({loadingState:true})
        try{
            const response = await axios.post('/api/auth/logout')
            set({user:null})
            set({loadingState:false})
            console.log("logged out")
            toast.success("log out success")
        }catch(err){
            toast.error("log out failed")
            console.log(err.message)
        }
    },

    checkAuth:async ()=>{
        set({checkingAuth:true})
        try{
            const response = await axios.get('/api/auth/profile') 
            console.log("this is chenck aut")
            console.log(response.data)
            set({user:response.data,checkingAuth:false})
        }catch(err){
            console.log(err.message)
        }
    }
}))
