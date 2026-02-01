import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore.js';

const UserMenu = () => {
  const {logout} = useUserStore()
  const logoutFunction=()=>{
    logout();
  }
  const {user} = useUserStore()
  const admin = user?.role === 'admin'
  return (
    <div>
        <div className="flex flex-col py-5 gap-3 items-center relative z-100">
            <Link to="/">Home</Link>
            {!user ? 
              <div className="flex flex-col gap-3">
                <Link to='/login'>Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>:
                <Link onClick={logoutFunction}>Log Out</Link>
            }
            {admin &&
              <div>
                <Link to="/admin-pannel">Admin Pannel</Link>
              </div>
            }
        </div>
    </div>
  )
}

export default UserMenu