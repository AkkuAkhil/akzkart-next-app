import dbConnect from '../../../middlewares/mongodb';
import Product from '../../../models/Product';
import { PER_PAGE_ITEMS } from '../../../helpers/constants';

const handler = async (req, res) => {
  const { method } = req;
  const { slug } = req.query;
  const id = slug[0];
  const page = slug[1] || 1;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({ userId: id })
          .sort({ date: -1 })
          .skip((page - 1) * PER_PAGE_ITEMS)
          .limit(PER_PAGE_ITEMS);
        res.status(200).json({ success: true, products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
