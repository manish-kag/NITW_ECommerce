import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../src/context/ShopContext";
import Title from "../src/components/Title";
import { assets } from "../src/assets/product/assets";
import CartTotal from "../src/components/CartTotal";
import Loader from "../src/components/Loader"; // Import Loader
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, getUserCart, token, loading, setLoading } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getUserCart(token).finally(() => setLoading(false));
    }
    else navigate("/login");
  }, [token, navigate, getUserCart, setLoading]);

  useEffect(()=>{
    if(products.length > 0){
      const tempData = [];
      for(const items in cartItems){
        if(cartItems[items] > 0){
          tempData.push({
            _id: items,
            quantity: cartItems[items]
          })
        }
      }
      setCartData(tempData);
      setLoading(false);
    }
  }, [cartItems, products, setLoading])

  if (loading) return <Loader />;

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2 = {'CART'}/>
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product)=> product._id === item._id);
          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img src={productData?.images[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData?.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData?.price}</p>
                  </div>
                </div>
              </div>
              <span className='text-center'>{item?.quantity}</span>
              <img onClick={()=> updateQuantity(item._id, null, 0)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' alt="" />
            </div>
          )
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={()=> navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Cart;

// Add the loader CSS as in Profile.jsx
