import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },

  images: { type: [String], required: true },

  category: { type: String, required: true },
  subCategory: { type: String },

  specifications: {
    type: String,
    default: ""
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null
  },

  bestseller: { type: Boolean, default: false },

  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  },

  createdAt: { type: Date, default: Date.now }
});

const productModel = mongoose.models.product || mongoose.model('product', productSchema);
export default productModel;
