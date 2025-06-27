import React from 'react'
import Title from '../src/components/Title';
import { assets } from '../src/assets/product/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2 = {'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            <b className="text-gray-800">CampusShop</b> is a dedicated marketplace for students to buy and sell items within their campus community. We believe that every student should have a safe, easy, and affordable way to exchange books, electronics, cycles, stationery, and more with fellow students.
          </p>
          <p>
            Our platform is designed to help students save money, reduce waste, and connect with others on campus. Whether you want to sell your old textbooks, find a second-hand laptop, or get a great deal on a cycle, CampusShop makes it simple and secure.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission is to empower students by providing a trusted platform for peer-to-peer commerce. We aim to make campus life more sustainable, affordable, and connected by enabling students to easily buy, sell, and discover useful items right where they study and live.
          </p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Student-Focused Platform</b>
          <p className='text-gray-600'>Built exclusively for students, ensuring a safe and relevant marketplace for your campus needs.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Easy & Secure Transactions</b>
          <p className='text-gray-600'>List your items or make purchases with just a few clicks. Our platform is designed for simplicity and security.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Support & Community</b>
          <p className='text-gray-600'>Our team is here to help you every step of the way. Join a growing community of students helping each other succeed.</p>
        </div>
      </div>
    </div>
  )
}

export default About;
