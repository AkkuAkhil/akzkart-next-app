import mongoose from 'mongoose';

const product = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  userId: { type: String, required: true },
  date: { type: Number, required: true }
});

module.exports = mongoose.models.Product || mongoose.model('Product', product);
