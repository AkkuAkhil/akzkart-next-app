import dbConnect from '../middlewares/mongodb';
import Product from '../models/Product';
import Order from '../models/Order';

export const fetchAllProducts = async () => {
  await dbConnect();
  const products = await Product.find({});
  return JSON.parse(JSON.stringify(products));
};

export const fetchMyProducts = async id => {
  await dbConnect();
  const products = await Product.find({ userId: id });
  return JSON.parse(JSON.stringify(products));
};

export const fetchMyOrders = async id => {
  await dbConnect();
  const orders = await Order.find({ userId: id });
  return JSON.parse(JSON.stringify(orders));
};

export const fetchProductById = async productId => {
  await dbConnect();
  const product = await Product.findOne({ _id: productId });
  return JSON.parse(JSON.stringify(product));
};

export const getAllIdParams = async () => {
  await dbConnect();
  const products = await Product.find({}).select('_id');
  return products.map(({ _id }) => ({ params: { productId: _id.toString() } }));
};
