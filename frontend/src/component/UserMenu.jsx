import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    const user = false;
    const admin = true;
  return (
    <div>
        <div className="flex flex-col py-5 gap-3 items-center">
            <Link to="/">Home</Link>
            {!user ? 
              <div className="flex flex-col gap-3">
                <Link to='/login'>Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>:
                <Link>Log Out</Link>
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