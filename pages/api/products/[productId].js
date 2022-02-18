import dbConnect from '../../../middlewares/mongodb';
import Product from '../../../models/Product';

const UPDATE_SUCCESS = 'Succesfully Updated Product';
const DELETE_SUCCESS = 'Succesfully Deleted Product';

const handler = async (req, res) => {
  const { method } = req;
  const { productId } = req.query;
  await dbConnect();

  switch (method) {
    case 'PATCH':
      try {
        const product = await Product.findOne({ _id: productId });
        const updatedProduct = {
          name: req.body.name || product.name,
          price: req.body.price || product.price,
          image: req.body.image || product.image,
          description: req.body.description || product.description
        };
        await Product.updateOne({ _id: productId }, updatedProduct);
        res.status(201).json({ success: true, message: UPDATE_SUCCESS });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        await Product.deleteOne({ _id: productId });
        res.status(201).json({ success: true, message: DELETE_SUCCESS });
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
