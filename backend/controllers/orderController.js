import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe";
import axios from "axios";
import productModel from "../models/productModel.js"; // <-- import productModel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "inr";
const deliveryCharges = 10; // Set correct delivery fee
const MIN_ORDER_AMOUNT = 50; // Set correct minimum order amount

const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const {items, address} = req.body;
        let totalAmount = 0;
        for (const item of items) {
            const product = await import('../models/productModel.js').then(m => m.default.findById(item.product));
            if (!product) continue;
            totalAmount += (item.priceAtPurchase || product.price) * (item.quantity || 1);
        }
        totalAmount += 10; // deliveryCharges
        const orderData = {
            userId,
            items,
            amount: totalAmount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        // Instead of deleting, mark product as sold and store buyer info
        for (const item of items) {
            const productId = item._id || item.product || item.id;
            if (productId) {
                await productModel.findByIdAndUpdate(productId, {
                    status: "sold",
                    buyer: userId // Add buyer field to product
                });
            }
        }

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: "Order Placed"})
    }
    catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId;
        let {items, address} = req.body;
        const {origin}=req.headers;

        // 🚩 Reject empty cart
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty. Please add items before placing an order."
            });
        }

        // Fetch product prices from DB and calculate total
        let totalAmount = 0;
        let line_items = [];
        for (const item of items) {
            // Accept both _id and id for product reference
            const productId = item._id || item.product || item.id;
            if (!productId) {
                return res.status(400).json({ success: false, message: 'Invalid product in cart.' });
            }
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(400).json({ success: false, message: `Product not found: ${productId}` });
            }
            const price = Number(product.price);
            const quantity = Number(item.quantity) || 1;
            if (isNaN(price) || isNaN(quantity) || quantity < 1) {
                return res.status(400).json({ success: false, message: 'Invalid product price or quantity.' });
            }
            totalAmount += price * quantity;
            line_items.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: product.name,
                        images: product.images && product.images.length ? [product.images[0]] : [],
                    },
                    unit_amount: price * 100,
                },
                quantity: quantity,
            });
        }
        totalAmount += deliveryCharges;
        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: "Shipping" },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1
        });

        if (totalAmount < MIN_ORDER_AMOUNT) {
            return res.status(400).json({
                success: false,
                message: `Minimum order amount (including delivery) is ₹${MIN_ORDER_AMOUNT}`
            });
        }

        const orderData = {
            userId,
            items,
            amount: totalAmount,
            address,
            paymentMethod: "Online",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
            locale: 'en', // Force English locale to avoid Stripe language bug
        });

        res.json({success: true, session_url: session.url});
    }
    catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const verifyStripe = async (req, res) => {
    try {
        const { success, orderId } = req.body; // <-- change from req.query to req.body
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Payment Successful"});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Payment Failed"});
        }
    }
    catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// User order data for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.userId; // get from middleware
        // Populate product details for each item
        const orders = await orderModel.find({ userId }).populate('items.product');
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update order status
const updateStatus = async (req, res) => {
    try{
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: "Order Status Updated"})
    }
    catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {
  verifyStripe,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  updateStatus,
  userOrders
};