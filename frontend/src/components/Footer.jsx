import React from 'react'
import { assets } from '../assets/product/assets'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    {/* Logo */}
           <Link to={'/'}> <img
        src={assets.logo}
        alt="Logo"
        style={{ height: "80px", width: "auto", objectFit: "contain" }}
      />
      </Link>
      <p className='w-full md:w-2/3 text-gray-600'>
        CampusShop is your trusted marketplace for buying and selling books, electronics, cycles, and more within your campus community. Connect with fellow students, find great deals, and give your unused items a new home—all in one safe and easy platform.
      </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5' >COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-x1 font-medium mb-5 '>Get In Touch</p>
                    <ul  className='flex flex-col gap-1 text-gray-600'>
                        <li>+91-7440270098</li>
                        <li>mkag5157@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div><hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@.nitshop.com - All Right Reserved</p></div>
        </div>
    )
}

export default Footer
