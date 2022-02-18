import dbConnect from '../../../middlewares/mongodb';
import Product from '../../../models/Product';

const INSERTION_SUCCESS = 'Succesfully Inserted Product';

const handler = async (req, res) => {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, message: INSERTION_SUCCESS });
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
