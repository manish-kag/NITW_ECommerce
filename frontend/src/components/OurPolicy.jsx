import React from 'react'
import { assets } from '../assets/product/assets'
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div >
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5 ' alt="" />
            <p className='font-semibold'>Easy Selling for Students</p>
            <p className='text-gray-400 '>Students can easily list and sell their items to others on campus.</p>
        </div>
         <div >
            <img src={assets.quality_icon} className='w-12 m-auto mb-5 ' alt="" />
            <p className='font-semibold'>3 days return policy</p>
            <p className='text-gray-400 '>we provide 3 days free return policy for an specific item </p>
        </div>
         <div >
            <img src={assets.support_img} className='w-12 m-auto mb-5 ' alt="" />
            <p className='font-semibold'>Best Customer support</p>
            <p className='text-gray-400 '>We provide 24/7 customer support </p>
        </div>
    </div>
  )
}

export default OurPolicy