import React, { useContext } from 'react'
import { ShopContext } from '../src/context/ShopContext'

const Collection = () => {
  const  {product}=useContext(ShopContext);
  return (
    <div className='flex '><h1>colllection</h1></div>
  )
}

export default Collection