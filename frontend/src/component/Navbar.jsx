import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User } from "lucide-react";
import UserMenu from './UserMenu.jsx';

const Navbar = () => {
    const admin= true
    const user = true
    const [userMenu, toggleUserMenu] = useState(false)

    // user menu function
    const userMenuFunction=()=>{
        toggleUserMenu(!userMenu)
    }
  return (
    <nav className="bg-oxford w-full h-[10vh] pt-2 px-4 text-oxford">
        <div className="flex justify-between items-center">
            <div className="font-bold text-lg">
                <Link to="/" className="text-tan">E-commerce</Link>
            </div>

            {/* the user menu and the cart*/}
            <div className="rounded-2xl flex bg-white p-3 gap-7 relative">
                {user && 
                    <div className="bg-oxford p-1 box-content rounded-2xl w-8 flex justify-center items-center text-tan">
                        <Link to="/cart"><ShoppingCart size={20}/></Link>
                    </div>
                }
                <User onClick={userMenuFunction}/>
                {userMenu &&
                    <div className="bg-oxford absolute w-38 right-[-10%] h-auto flex justify-center items-center rounded top-[9vh] text-tan">
                        <UserMenu size={8}/>
                    </div>
                }
            </div>
        </div>
    </nav>
  )
}

export default Navbar