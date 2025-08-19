import React, { useState } from 'react'
import axios from 'axios'

const NewsLetterBox = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://inter-nit-backend.vercel.app";
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setStatus('');
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('Please enter a valid email address.');
            return;
        }
        try {
            const res = await axios.post(`${backendUrl}/api/newsletter/subscribe`, { email });
            if (res.data.success) {
                setStatus('Thank you for subscribing to CampusShop updates!');
                setEmail('');
            } else {
                setStatus(res.data.message || 'Subscription failed. Please try again.');
            }
        } catch (error) {
            setStatus('Subscription failed. Please try again.');
        }
    };

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe for CampusShop Updates</p>
            <p className='text-gray-400 mt-3'>
                Get the latest deals, new arrivals, and campus marketplace news delivered to your inbox.
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto m-6 border pl-3'>
                <input
                    className='w-full sm:flex-1 outline-none'
                    type="email"
                    placeholder='Enter your Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
            </form>
            {status && <div className="text-sm mt-2 text-gray-700">{status}</div>}
        </div>
    )
}

export default NewsLetterBox
