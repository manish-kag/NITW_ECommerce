import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(false);

    // ------------------------------------
    // CART OPERATIONS
    // ------------------------------------
    const addToCart = async (itemId) => {
        if (!token) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        let cartData = { ...cartItems };
        if (cartData[itemId] && cartData[itemId] > 0) {
            toast.info('Already in the cart');
            return;
        }

        cartData[itemId] = 1;
        setCartItems(cartData);

        try {
            await axios.post(`${backendUrl}/api/cart/add`, { itemId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        let cartData = { ...cartItems };
        if (quantity > 0) {
            cartData[itemId] = quantity;
        } else {
            delete cartData[itemId];
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, quantity }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    // ------------------------------------
    // DATA FETCHING
    // ------------------------------------
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (authToken) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (response.data.success) {
                setCartItems(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const getUserById = async (userId) => {
        if (!userId || userId === "null" || userId === "undefined") {
            return null;
        }
        try {
            const res = await axios.get(`${backendUrl}/api/user/${userId}`);
            return res.data.success ? res.data.user : null;
        } catch (error) {
            return null;
        }
    };

    // ------------------------------------
    // EFFECTS
    // ------------------------------------
    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            getUserCart(storedToken); // <-- only once
        }
    }, []);

    // ------------------------------------
    // UTILITIES
    // ------------------------------------
    const requireLogin = () => {
        if (!token) {
            toast.error('Please login first');
            navigate('/login');
            return false;
        }
        return true;
    };

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl, token, setToken,
        setProducts, getUserCart,
        users, getUserById, requireLogin,
        loading, setLoading
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
