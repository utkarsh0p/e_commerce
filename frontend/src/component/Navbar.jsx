import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import UserMenu from "./UserMenu.jsx";
import { useCartStore } from "../store/useCartStore.js";

const Navbar = () => {
  const {cart} = useCartStore()
  const cartItemCount = cart.length

  const [userMenu, toggleUserMenu] = useState(false);
  const [valInput, setValInput] = useState("");

  const userMenuFunction = () => {
    toggleUserMenu(!userMenu);
  };

  const handleInput = (e) => {
    setValInput(e.target.value);
  };

  const productSearch = () => {
    console.log(valInput);
    setValInput("");
  };


  return (
    <nav className="bg-oxford w-full h-[10vh] pt-2 px-4 text-oxford">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-lg">
          <Link to="/" className="text-tan">
            E-commerce
          </Link>
        </div>

        {/* Search */}
        <div className="flex w-[30%] rounded-l-full overflow-hidden hidden md:flex">
          <input
            type="text"
            placeholder="Search for the products"
            value={valInput}
            className="bg-white text-tan p-1 outline-none w-full px-5"
            onChange={handleInput}
          />
          <div
            className="text-white flex justify-center items-center px-4 bg-tan rounded-r-full cursor-pointer"
            onClick={productSearch}
          >
            Search
          </div>
        </div>

        {/* Cart & User */}
        <div className="rounded-2xl flex flex-row bg-white p-3 gap-7 relative">
          {/* Cart */}
          <div className="relative">
            <Link
              to="/cart"
              className="bg-oxford p-1 box-content rounded-2xl w-8 flex justify-center items-center text-tan"
            >
              <ShoppingCart size={20} />
            </Link>

            {/* Cart item count */}
            <span className="absolute -top-2 -right-2 bg-tan text-oxford text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartItemCount}
            </span>
          </div>

          {/* User icon */}
          <User
            onClick={userMenuFunction}
            className="text-app-black cursor-pointer"
          />

          {/* User menu */}
          {userMenu && (
            <div className="bg-oxford absolute w-38 right-[-10%] h-auto flex justify-center items-center rounded top-[9vh] text-app-black">
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
