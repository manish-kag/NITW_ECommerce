import { Link, NavLink } from "react-router-dom";
import React, { useContext,useState } from 'react';

import { assets } from "../assets/product/assets"; 
import "../App.css";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,getCartCount}= useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 px-8 font-medium relative">
      {/* Logo */}
    <Link to={'/'}> <img
        src={assets.logo}
        alt="Logo"
        style={{ height: "80px", width: "auto", objectFit: "contain" }}
      />
</Link>
      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <li>
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <img onClick={()=>setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>
    
{/* Sidebar menu for small screens */}
<div className={`fixed top-0 right-0 h-full bg-white z-50 transition-all duration-300 ease-in-out ${visible ? 'w-3/4' : 'w-0'}`}
>
  <div className='flex flex-col text-gray-600'>
    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
      <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
      <p>Back</p>
    </div>

    <NavLink onClick={()=>setVisible()} className='py-2 pl-6 border' to='/'>HOME</NavLink>
    <NavLink onClick={()=>setVisible()} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
    <NavLink onClick={()=>setVisible()}className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
    <NavLink onClick={()=>setVisible()} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
  </div>
</div>

      
    </div>
  );
};

export default Navbar;




// mobile menu 
//
//{/* 
//      {/* Mobile Menu */}
//      {visible && (
//        <div className="fixed inset-0 bg-white z-50 transition-all duration-300 sm:hidden p-6">
//          <div className="flex justify-between items-center mb-6">
//            <img
//              src={images["logo/logo.png"]}
//              alt="Logo"
//              className="h-8"
//            />
//            <button onClick={() => setVisible(false)} className="text-2xl font-bold">✕</button>
//          </div>
//          <ul className="flex flex-col gap-5 text-gray-800">
//            <li><NavLink to="/" onClick={() => setVisible(false)}>HOME</NavLink></li>
//            <li><NavLink to="/collection" onClick={() => setVisible(false)}>COLLECTION</NavLink></li>
//            <li><NavLink to="/about" onClick={() => setVisible(false)}>ABOUT</NavLink></li>
//            <li><NavLink to="/contact" onClick={() => setVisible(false)}>CONTACT</NavLink></li>
//          </ul>
//        </div>
//        )} 