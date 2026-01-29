import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './component/Navbar.jsx'
import CartPage from './pages/CartPage.jsx'
import AdminPannel from './pages/AdminPannel.jsx'
import LoadingPage from './pages/LoadingState.jsx'
import { useUserStore } from './store/useUserStore.js'
import { useEffect } from 'react'

const App = () => {

    const {loadingState, user, checkAuth} = useUserStore()
    useEffect(()=>{
        checkAuth()
    },[])
    
    if(loadingState) return <LoadingPage/>
    return <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={user?<HomePage/>:<LogInPage/>} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/admin-pannel" element={<AdminPannel/>}/>
        </Routes>
    </>
}

export default App