// EditItem.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditItem = ({ productId }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    // Fetch product data
    axios.get(`/api/product/${productId}`).then(res => setForm(res.data.product));
  }, [productId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = "USER_TOKEN"; // Replace with actual token
    await axios.put(`/api/product/update/${productId}`, form, { headers: { Authorization: `Bearer ${token}` } });
    alert("Item updated!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name || ""} onChange={handleChange} />
      <input name="price" value={form.price || ""} onChange={handleChange} />
      {/* ...other fields... */}
      <button type="submit">Update Item</button>
    </form>
  );
};

export default EditItem;