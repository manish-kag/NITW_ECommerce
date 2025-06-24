import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../src/context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../src/components/Title";

const Profile = () => {
  const { token, backendUrl, getUserById, navigate } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch user info and their products
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      // Get user info
      const userData = await getUserById(localStorage.getItem("userId"));
      setUser(userData?.user || userData); // Ensure correct structure
      // Get user's products
      try {
        const res = await axios.get(`${backendUrl}/api/product/user/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setProducts(res.data.products);
      } catch (err) {
        toast.error("Failed to fetch your products");
      }
      setLoading(false);
    };
    fetchData();
  }, [token, backendUrl, getUserById, navigate]);

  // Handle product edit
  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      specifications: product.specifications || "",
      bestseller: product.bestseller || false,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update/${editProductId}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Item updated!");
        setEditProductId(null);
        // Refresh products
        const prodRes = await axios.get(`${backendUrl}/api/product/user/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(prodRes.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Handle product delete
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Item deleted!");
        setProducts(products.filter((p) => p._id !== productId));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // Profile info edit (address, phone, etc.)
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const handleProfileEdit = () => {
    setProfileEdit(true);
    setProfileForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      branch: user?.branch || "",
    });
  };
  const handleProfileChange = (e) => {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${backendUrl}/api/user/update`,
        profileForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Profile updated!");
        setProfileEdit(false);
        setUser(res.data.user);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Profile update failed");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="border-t pt-10 px-4 max-w-3xl mx-auto">
      {/* Welcome message */}
      {user?.name && (
        <div className="text-2xl font-bold text-center mb-4 text-gray-800">
          Welcome, {user.name}!
        </div>
      )}

      <Title text1="MY" text2="PROFILE" />

      {/* Basic Information Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow p-6 my-8 flex flex-col sm:flex-row items-center gap-8 border border-gray-200">
        <div className="flex-1">
          <p className="font-bold text-2xl mb-2 text-gray-800">{user?.name}</p>
          <div className="flex flex-col gap-1 text-gray-700">
            <span>
              <span className="font-semibold">Contact:</span>{" "}
              {user?.phone ? (
                <span className="text-black">{user.phone}</span>
              ) : (
                <span className="text-red-500">Not Provided</span>
              )}
            </span>
            <span>
              <span className="font-semibold">Email:</span>{" "}
              {user?.email ? (
                <span className="text-black">{user.email}</span>
              ) : (
                <span className="text-red-500">Not Provided</span>
              )}
            </span>
          </div>
        </div>
        <div>
          <button
            className="border border-black px-6 py-2 mt-3 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded"
            onClick={handleProfileEdit}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Edit Form */}
      {profileEdit && (
        <div className="bg-white rounded shadow p-6 my-8 border border-gray-200">
          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-3">
            <input
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              className="border px-3 py-2 rounded"
              placeholder="Name"
              required
            />
            <input
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              className="border px-3 py-2 rounded"
              placeholder="Email"
              required
              type="email"
            />
            <input
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              className="border px-3 py-2 rounded"
              placeholder="Phone"
              required
            />
            <input
              name="branch"
              value={profileForm.branch}
              onChange={handleProfileChange}
              className="border px-3 py-2 rounded"
              placeholder="Branch"
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Save
              </button>
              <button
                type="button"
                className="border border-black px-6 py-2 rounded"
                onClick={() => setProfileEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Divider */}
      <div className="my-8 border-t border-gray-200"></div>

      <Title text1="MY" text2="ITEMS" />
      <div className="my-8 grid gap-6">
        {products.length === 0 && <p className="text-gray-500">No items listed for sale.</p>}
        {products.map((product) =>
          editProductId === product._id ? (
            <form
              key={product._id}
              onSubmit={handleEditSubmit}
              className="bg-gray-50 border rounded p-4 mb-4 flex flex-col gap-2 shadow"
            >
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="border px-3 py-2 rounded"
                placeholder="Item Name"
                required
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="border px-3 py-2 rounded"
                placeholder="Description"
                required
              />
              <input
                name="price"
                value={editForm.price}
                onChange={handleEditChange}
                className="border px-3 py-2 rounded"
                placeholder="Price"
                type="number"
                required
              />
              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="border px-3 py-2 rounded"
                placeholder="Category"
                required
              />
              <input
                name="subCategory"
                value={editForm.subCategory}
                onChange={handleEditChange}
                className="border px-3 py-2 rounded"
                placeholder="Sub Category"
              />
              <textarea
                name="specifications"
                value={editForm.specifications}
                onChange={handleEditChange}
                className="border px-3 py-2 rounded"
                placeholder="Specifications"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="bestseller"
                  checked={editForm.bestseller}
                  onChange={handleEditChange}
                />
                Bestseller
              </label>
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="border border-black px-6 py-2 rounded"
                  onClick={() => setEditProductId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div
              key={product._id}
              className="bg-white border rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={product.images && product.images[0]}
                alt={product.name}
                className="w-24 h-24 object-cover rounded border"
              />
              <div className="flex-1 w-full">
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-gray-600 text-sm mb-1">{product.description}</p>
                <p className="text-gray-700 mt-1 font-medium">₹{product.price}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {product.category} / {product.subCategory}
                </p>
                <div className="flex gap-2">
                  <button
                    className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="border border-red-500 text-red-500 px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-all duration-500 rounded"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
