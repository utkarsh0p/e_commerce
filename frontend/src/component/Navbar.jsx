import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, SearchIcon} from "lucide-react";
import UserMenu from './UserMenu.jsx';
import { useUserStore } from '../store/useUserStore.js';

const Navbar = () => {
    const {user}= useUserStore()
    const [userMenu, toggleUserMenu] = useState(false)
    const [valInput, setValInput] = useState("")
    const [productName, setProductName] = useState("")
    const userMenuFunction=()=>{
        toggleUserMenu(!userMenu)
    }


    const handleInput = (e)=>{
        const {value} = e.target
        setValInput(value)
    }

    const productSearch =()=>{
        console.log(valInput)
        setValInput("")
    }

  return (
    <nav className="bg-oxford w-full h-[10vh] pt-2 px-4 text-oxford">
        <div className="flex justify-between items-center">
            <div className="font-bold text-lg">
                <Link to="/" className="text-tan">E-commerce</Link>
            </div>

            {/* the user menu and the cart*/}

            {/* this is the search function */}
            <div className="flex w-[30%] rounded-l-full overflow-hidden hidden md:flex">
                <input 
                    type="text"  
                    placeholder='Seach for the products' 
                    value={valInput}
                    className="bg-white text-tan p-1 outline-none w-full px-5"
                    onChange={handleInput}
                />
                <div className="text-white flex justify-center items-center px-2 bg-app-black rounded-r-full cursor-pointer" onClick={productSearch}><p>Search</p></div>
            </div>
            <div className="rounded-2xl flex flex-row bg-white p-3 gap-7 relative">
                {user && 
                    <div className="bg-oxford p-1 box-content rounded-2xl w-8 flex justify-center items-center text-tan">
                        <Link to="/cart"><ShoppingCart size={20}/></Link>
                    </div>
                }
                <User onClick={userMenuFunction} className="text-app-black"/>
                {userMenu &&
                    <div className="bg-oxford absolute w-38 right-[-10%] h-auto flex justify-center items-center rounded top-[9vh] text-app-black">
                        <UserMenu size={8}/>
                    </div>
                }
            </div>
        </div>
    </nav>
  )
}

export default Navbar