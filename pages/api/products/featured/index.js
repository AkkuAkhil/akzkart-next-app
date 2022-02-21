import dbConnect from '../../../../middlewares/mongodb';
import Product from '../../../../models/Product';
import { FEATURED_PER_PAGE_ITEMS } from '../../../../helpers/constants';

const handler = async (req, res) => {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({})
          .sort({ date: -1 })
          .limit(FEATURED_PER_PAGE_ITEMS);
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
