import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  branch: { type: String }, // optional: for future recommendations
  phone: { type: String, required: true }, // <-- Make phone required

  cartData: { type: Object, default: {} }, // can be updated later for Cart model

  soldItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  boughtItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],

  createdAt: { type: Date, default: Date.now }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;


