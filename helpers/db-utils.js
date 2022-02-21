import dbConnect from '../middlewares/mongodb';
import Product from '../models/Product';
import Order from '../models/Order';
import { PER_PAGE_ITEMS, FEATURED_PER_PAGE_ITEMS } from './constants';

export const fetchFeaturedProducts = async () => {
  await dbConnect();
  const products = await Product.find({})
    .sort({ date: -1 })
    .limit(FEATURED_PER_PAGE_ITEMS);
  return JSON.parse(JSON.stringify(products));
};

export const fetchAllProducts = async (page = 1) => {
  await dbConnect();
  const products = await Product.find({})
    .sort({ date: -1 })
    .skip((page - 1) * PER_PAGE_ITEMS)
    .limit(PER_PAGE_ITEMS);
  return JSON.parse(JSON.stringify(products));
};

export const fetchMyProducts = async (id, page = 1) => {
  await dbConnect();
  const products = await Product.find({ userId: id })
    .sort({ date: -1 })
    .skip((page - 1) * PER_PAGE_ITEMS)
    .limit(PER_PAGE_ITEMS);
  return JSON.parse(JSON.stringify(products));
};

export const fetchMyOrders = async id => {
  await dbConnect();
  const orders = await Order.find({ userId: id }).sort({ date: -1 });
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
