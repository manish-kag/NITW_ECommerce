import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../src/context/ShopContext';
// import Title from '../src/components/Title';

const Cart = () => {

  const { products, currency, cartItems } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }

    setCartData(tempData);

  }, [cartItems]);


const Cart = ({ cartData, products }) => {
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find(product => product._id === item._id);

            // Defensive check if productData exists to avoid errors
            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]  items-center gap-4 "
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

}
export default Cart;