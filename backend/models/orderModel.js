import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  quantity: { type: Number, default: 1 },
  priceAtPurchase: { type: Number } // if price changes later
}, { _id: false });

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

  items: { type: [itemSchema], required: true },

  amount: { type: Number, required: true },

  address: { type: addressSchema, required: true },

  status: {
    type: String,
    enum: ['Order Placed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Order Placed'
  },

  paymentMethod: { type: String, enum: ['COD', 'Online'], required: true },
  payment: { type: Boolean, default: false },

  date: { type: Date, default: Date.now }
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
