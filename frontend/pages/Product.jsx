import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../src/context/ShopContext';
import { assets } from '../src/assets/product/assets';
import RelatedProduct from '../src/components/RelatedProduct';
import ProductContact from '../src/components/ProductContact';
import Loader from '../src/components/Loader';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, cartItems, requireLogin, loading } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images[0]); // Assuming `image` is an array of URLs
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (loading) return <Loader />;

  if (!productData) {
    return (
      <div className="p-10 flex justify-center items-center min-h-[40vh]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Section */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Left Section: Images */}
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full gap-2">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-24 h-24 object-cover cursor-pointer border ${
                  image === item ? 'border-orange-500' : 'border-gray-200'
                }`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto border border-gray-200" alt="Main Product" />
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          {/* Contact Number Display */}
          <ProductContact sellerId={productData.seller} />
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="Star" />
            <img src={assets.star_icon} className="w-3.5" alt="Star" />
            <img src={assets.star_icon} className="w-3.5" alt="Star" />
            <img src={assets.star_icon} className="w-3.5" alt="Star" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="Dull Star" />
            <p className="pl-2">122</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            {/* Size selection removed */}
          </div>
          <button
            onClick={() => {
              if (!requireLogin()) return;
              if (cartItems[productData._id]) {
                window.toast && window.toast.info('Already in the cart');
              } else {
                addToCart(productData._id);
              }
            }}
            className={`bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ${cartItems[productData._id] ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={!!cartItems[productData._id]}
          >
            {cartItems[productData._id] ? 'Already in Cart' : 'ADD TO CART'}
          </button>
          {productData.specifications && (
            <div className="mt-4">
              <b>Specifications:</b>
              <p>{productData.specifications}</p>
            </div>
          )}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return & exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />
    </div>
  ) ;(
    <div className="opacity-0"></div>
  );
};

export default Product;
