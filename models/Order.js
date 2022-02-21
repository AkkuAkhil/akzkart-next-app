import mongoose from 'mongoose';

const order = new mongoose.Schema({
  cart: { type: {}, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Number, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.models.Order || mongoose.model('Order', order);
