import React from 'react'
import Title from '../src/components/Title';
import NewsLetterBox from '../src/components/NewsLetterBox';
import { assets } from '../src/assets/product/assets';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>CampusShop Office</p>
          <p className='text-gray-500'>
            National Institute of Technology Warangal<br />
            Hanamkonda, Telangana 506004, India
          </p>
          <p className='text-gray-500'>
            Tel: +91-7440270098<br />
            Email: mkag5157@gmail.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Connect With Us</p>
          <p className='text-gray-600'>
            Have questions, suggestions, or need support? Reach out to our team and we’ll be happy to help you with your campus buying and selling experience.
          </p>
          <a
            href="mailto:mkag5157@gmail.com"
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
          >
            Email Us
          </a>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact;
