import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); 

  // Ensure `image` is an array and has at least one element
  const productImage = Array.isArray(image) && image.length > 0 ? image[0] : "placeholder.jpg";

  return (
    <Link className='text-gray-700 cursor-pointer' to={id ? `/product/${id}` : '#'}
    >
      <div className='overflow-hidden w-[200px] h-[200px] flex items-center justify-center bg-gray-100'>
        <img
          className='hover:scale-110 transition ease-in-out w-full h-full object-cover'
          src={productImage}
          alt={name || "Product"}
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name || "No Name"}</p>
      <p className='text-sm font-medium'>{currency ? currency + price : "Price Not Available"}</p>
    </Link>
  );
};

export default ProductItem;
