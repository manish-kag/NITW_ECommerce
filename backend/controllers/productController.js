import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
import userModel from "../models/userModel.js";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });
  

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, specifications } = req.body;

        // ✅ Ensure req.files exists
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

        // ✅ Extract images safely
        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];
        const image4 = req.files.image4?.[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // ✅ Upload images to Cloudinary (no resize)
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image'
                });
                return result.secure_url;
            })
        );

        // ✅ Create product data object
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true:false,
            images: imagesUrl,
            date: Date.now(),
            specifications, // just as a string
        };

        // ✅ Save product in DB
        const product = new productModel(productData);
        await product.save();
        res.json({ success: true, message: "Product Added" });

    } 
    catch (error){
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

// function for list product
const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({}).populate('buyer', 'name email');
        res.json({success:true, products})
    }
    catch (error){
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product removed"})
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success: true, product})
    }
    catch (error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

// sell item function
export const sellItem = async (req, res) => {
    try {
        const seller = req.userId;
        const { name, price, description, category, subCategory, bestseller, specifications } = req.body;

        // Handle images
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];
        const images = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image'
                    });
                    return result.secure_url;
                })
            );
        }

        const product = new productModel({
            name,
            price,
            description,
            images: imagesUrl,
            category,
            subCategory,
            bestseller: bestseller === "true" || bestseller === true,
            specifications,
            seller,
            date: Date.now(),
            status: "available"
        });
        await product.save();
        await userModel.findByIdAndUpdate(seller, { $push: { soldItems: product._id } });
        res.json({ success: true, message: "Item listed for sale", product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export const buyItem = async (req, res) => {
    try {
        const buyer = req.userId;
        const { productId } = req.body;

        const product = await productModel.findOneAndUpdate(
            { _id: productId, status: "available" },
            { status: "sold" },
            { new: true }
        );

        if (!product) {
            return res.status(400).json({ success: false, message: "Item already sold" });
        }

        await userModel.findByIdAndUpdate(buyer, { $push: { boughtItems: product._id } });

        res.json({ success: true, message: "Purchase successful", product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const seller = req.userId;
        const updateData = req.body;

        // Only allow the seller to update their own item
        const product = await productModel.findOneAndUpdate(
            { _id: productId, seller },
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(403).json({ success: false, message: "Not authorized or item not found" });
        }

        res.json({ success: true, message: "Item updated", product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all products uploaded by the logged-in user
const getUserProducts = async (req, res) => {
    try {
        const userId = req.userId;
        const products = await productModel.find({ seller: userId });
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update a product (only by owner)
const updateProduct = async (req, res) => {
    try {
        const userId = req.userId;
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        if (!product) return res.json({ success: false, message: 'Product not found' });
        if (String(product.seller) !== String(userId)) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        const updates = req.body;
        Object.assign(product, updates);
        await product.save();
        res.json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct, getUserProducts, updateProduct }
