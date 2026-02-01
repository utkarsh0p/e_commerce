import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './component/Navbar.jsx'
import CartPage from './pages/CartPage.jsx'
import AdminPannel from './pages/AdminPannel.jsx'
import LoadingPage from './pages/LoadingState.jsx'
import { useUserStore } from './store/useUserStore.js'
import {Toaster} from 'react-hot-toast'
import { useEffect } from 'react'
import CategoryPage from './pages/CategoryPage.jsx'

const App = () => {

    const {loadingState, user, checkAuth} = useUserStore()
    useEffect(()=>{
        checkAuth()
    },[])
    if(loadingState) return <LoadingPage/>
    return <>
        <Toaster position="top-center"/>
        <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={user?<HomePage/>:<LogInPage/>} />
            <Route path="/signup" element={user?<HomePage/>:<SignUpPage/>} />
            <Route path="/cart" element={user?<CartPage/>:<LogInPage/>}/>
            <Route path="/admin-pannel" element={<AdminPannel/>}/>
            <Route path="/category/:category" element={<CategoryPage/>}/>
        </Routes>
    </>
}

export default App