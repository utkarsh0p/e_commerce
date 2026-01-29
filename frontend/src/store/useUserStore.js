import { create } from 'zustand'
import axios from '../lib/axios.js'

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
        } catch (error) {
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
            console.log("logged in user")
            console.log(get().user)
            set({loadingState:false})
        }catch(err){
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
        }catch(err){
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
