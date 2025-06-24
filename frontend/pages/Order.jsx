import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../src/context/ShopContext';
import Title from '../src/components/Title';
import axios from 'axios';
import Loader from '../src/components/Loader'; // Import Loader

const Orders = () => {
  const {backendUrl, token, currency, loading, setLoading} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    setLoading(true);
    try{
      if(!token){
        setLoading(false);
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {Authorization: `Bearer ${token}`}})
      if(response.data.success){
        let allOrderItems = []
        response.data.orders.forEach((order)=>{
          order.items.forEach((item) => {
            allOrderItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        })
        setOrderData(allOrderItems.reverse())
      }
    }
    catch(error){

    }
    setLoading(false);
  }

  useEffect(()=>{
    loadOrderData()
  }, [token])

  if (loading) return <Loader />;

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1 = {'MY'} text2 = {'ORDERS'}/>
      </div>
      <div>
        {orderData.map((item, index)=>(
          <div key={index} className='py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={(item.product?.images && item.product.images[0]) || (item.images && item.images[0]) || '/default-image.png'} alt="" />
              <div>
              <p className='sm:text-base font-medium'>{item.product?.name || item.name || 'Product'}</p>
              <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                <p>{currency}{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
              <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



export default Orders;

// Add the loader CSS as in Profile.jsx
