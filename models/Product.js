import mongoose from 'mongoose';

const product = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: String, required: true, default: 0 },
  userId: { type: String, required: true }
});

module.exports = mongoose.models.Product || mongoose.model('Product', product);
