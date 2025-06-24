import userModel from "../models/userModel.js";


// Add product to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Product added to cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Update user cart
const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};
        if (quantity > 0) {
            cartData[itemId] = quantity;
        } else {
            delete cartData[itemId];
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Get user cart
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId);
        let cartData = userData ? userData.cartData : {};
        res.json({ success: true, message: cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };