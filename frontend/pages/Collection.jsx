import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../src/context/ShopContext';
import { assets } from '../src/assets/product/assets';
import Title from '../src/components/Title';
import ProductItem from '../src/components/ProductItem';


const Collection = () => {
    const { products } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('');
    const { search, showSearch } = useContext(ShopContext);
    const toggleCategory = (e) => {
        const value = e.target.value;
        
        if (category.includes(value)) {
            setCategory(prev => prev.filter(item => item !== value));
        } else {
            setCategory(prev => [...prev, value]);
        }
    };
    
    const toggleSubCategory = (e) => {
        const value = e.target.value;
        
        if (subCategory.includes(value)) {
            setSubCategory(prev => prev.filter(item => item !== value));
        } else {
            setSubCategory(prev => [...prev, value]);
        }
    };
  

    // Always start filtering from the original products array
    useEffect(() => {
        let productCopy = products.slice();

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
        }

        // Sorting
        if (sortType === 'low-high') {
            productCopy = productCopy.sort((a, b) => a.price - b.price);
        } else if (sortType === 'high-low') {
            productCopy = productCopy.sort((a, b) => b.price - a.price);
        }

        setFilterProducts(productCopy);
    }, [products, category, subCategory, search, showSearch, sortType]);
    
    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* Filter Options */}
            <div className='min-w-60'>
                <p 
                    className='my-2 text-xl flex items-center cursor-pointer gap-2'
                    onClick={() => setShowFilter(!showFilter)}
                >
                    FILTERS
                <img src={assets.dropdown_icon} className=    {`h-3 sm:hidden ${showFilter ? 'rotate-90': ' '}`}  alt="" />
                </p>
                
                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm-block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>

                            <input className='w-3' type="checkbox"  onChange={toggleCategory} value={'Laptop'} /> Laptop
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox"   onChange={toggleCategory}value={'Bycycle'} /> Bycycle
                        </p>
                         <p className='flex gap-2'>
                            <input className='w-3' type="checkbox"   onChange={toggleCategory} value={'Others'} /> Others
                        </p>
                       
                    </div>
                    </div>
                    {/* sub category */}
                    <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm-block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox"  onChange={toggleSubCategory}  value={'Topwear'} /> bycycle
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Bottomwear'} /> Bottomwear
                        </p>
                         <p className='flex gap-2'>
                            <input className='w-3' type="checkbox"  onChange={toggleSubCategory} value={'Winterwear'} /> Winterwear
                        </p>
                       
                    </div>
                
                </div>
                </div>
          <div className='flex-1'>
            <div className='flex justify-between text-base sm:texr-2xl mb-4'>
              <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
              {/* product sort*/}{
               <select onChange={(e)=>setSortType(e.target.value)} name="" className='border-2 border-grey-300 text-sm px-2 'id="">
               <option   value="relavant"> sort by :Relavent</option>
               <option   value="low-high"> sort by :Low to High</option>
               <option   value="high-low"> sort by :High to Low</option>
               </select>
              }
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProducts.map((item,index)=>
                (
                 <ProductItem key={index}  name={item.name} id={item._id} price={item.price} image={item.images}></ProductItem>
                ))
              }
            </div>
          </div>
        </div>
      
    );
}

export default Collection;