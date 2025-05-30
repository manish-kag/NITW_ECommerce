import { createContext, useEffect, useState } from "react";
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { products } from "../assets/product/assets";
export const ShopContext = createContext();



  const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search,setSearch] =useState('');
  const [showSearch ,setShowSearch]=useState(false);
  const [cartItems,setCartItems]=useState({});


  const addToCart = async (itemId, size) => {
  let cartData = structuredClone(cartItems);
  if(!size){
    toast.error('Select Product Size');
    return ;
  }

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }

  setCartItems(cartData); // ✅ Pass the updated cart data
};
  
  const getCartCount = () => {
  let totalCount = 0;

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      try {
        if (cartItems[productId][size] > 0) {
          totalCount += cartItems[productId][size];
        }
      } catch (error) {
        console.error('Error reading cartItems:', error);
      }
    }
  }

  return totalCount;
};



  const value = {
    products,
    currency,
    delivery_fee,
    search,setSearch,showSearch,setShowSearch,
    cartItems ,addToCart,getCartCount
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
