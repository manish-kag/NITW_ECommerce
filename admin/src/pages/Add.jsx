import React, { useState } from 'react'
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App'
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Books");
  const [subCategory, setSubCategory] = useState("Textbook");
  const [bestseller, setBestseller] = useState(false);
  const [specifications, setSpecifications] = useState("");

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (images.every(img => !img)) {
      toast.error("Please upload at least one image to list your product.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("specifications", specifications);
      formData.append("sizes", JSON.stringify([]));

      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Books');
        setSubCategory('Textbook');
        setBestseller(false);
        setSpecifications('');
        setImages([false, false, false, false]);
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch (error){
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4 px-4 py-6'>
      {/* Image Uploads */}
      <div className='grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-8'>
        {[0, 1, 2, 3].map((idx) => (
          <label htmlFor={`image${idx + 1}`} className='col-span-1 flex flex-col items-center cursor-pointer' key={idx}>
            <img
              className='w-20 h-20 object-cover border rounded'
              src={!images[idx] ? assets.upload_area : URL.createObjectURL(images[idx])}
              alt=""
            />
            {
              !images[idx] && (
                <span className="text-xs text-gray-500 mt-2">Choose Image</span>
              )
            }
            <input
              onChange={(e) => handleImageChange(idx, e.target.files[0])}
              type="file"
              id={`image${idx + 1}`}
              accept="image/*"
              className="hidden"
            />
          </label>
        ))}
      </div>

      {/* Name */}
      <div className='w-full max-w-[500px]'>
        <p className='mb-1 font-medium'>Item Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-3 py-2 border rounded' type="text" placeholder='Ex: HP Laptop, Thermodynamics Book' required />
      </div>

      {/* Description */}
      <div className='w-full max-w-[500px]'>
        <p className='mb-1 font-medium'>Item Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full px-3 py-2 border rounded' rows={4} placeholder='Details about the item' required />
      </div>

      {/* Category + SubCategory + Price */}
      <div className='flex flex-col sm:flex-row gap-4 w-full'>
        <div>
          <p className='mb-1 font-medium'>Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='px-3 py-2 border rounded'>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Cycle">Cycle</option>
            <option value="Stationery">Stationery</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <p className='mb-1 font-medium'>Sub Category</p>
          <input onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='px-3 py-2 border rounded' type="text" placeholder="e.g. Engineering Drawing, Calculator" />
        </div>

        <div>
          <p className='mb-1 font-medium'>Price (₹)</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='px-3 py-2 border rounded w-[100px]' type="number" placeholder="500" required />
        </div>
      </div>

      {/* Specifications */}
      <div className='w-full max-w-[500px]'>
        <p className='mb-1 font-medium'>Specifications</p>
        <textarea
          onChange={(e) => setSpecifications(e.target.value)}
          value={specifications}
          className='w-full px-3 py-2 border rounded'
          rows={3}
          placeholder='e.g. Good condition, 2 years old, includes charger'
        />
      </div>

      {/* Bestseller */}
      <div className='flex items-center gap-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label htmlFor="bestseller" className='cursor-pointer'>Mark as bestseller</label>
      </div>

      {/* Submit Button */}
      <button type="submit" className='px-6 py-2 bg-black text-white rounded hover:bg-gray-800 mt-3'>ADD ITEM</button>
    </form>
  );
};

export default Add;
