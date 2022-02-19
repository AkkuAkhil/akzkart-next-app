import mongoose from 'mongoose';

const order = new mongoose.Schema({
  cart: { type: {}, required: true },
  totalPrice: { type: String, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.models.Order || mongoose.model('Order', order);
