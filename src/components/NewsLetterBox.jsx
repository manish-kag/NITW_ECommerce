import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler=(event)=>{
         event.preventDefault();
    }
  return (
    <div className='text-center'>
    <p className='text-2xl font-medium text-gray-800'>Suscribe now & get 20% off</p>
    <p className='text-gray-400 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse facilis incidunt ut, id quia rem nisi necessitatibus totam veritatis obcaecati, eum voluptatem dignissimos quos ratione molestias, ipsam deleniti dolor neque?</p>
    <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto m-6 border pl-3'>
     
<input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter you Email'/>
<button type='submit' className=' bg-black text-white text-xs px-10 py-4' >SUBSCRIBE</button>
</form>
</div>
   
  )
}

export default NewsLetterBox