import dbConnect from '../../../middlewares/mongodb';
import Order from '../../../models/Order';

const INSERTION_SUCCESS = 'Succesfully Inserted Product';

const handler = async (req, res) => {
  const { method } = req;
  const { userId: id } = req.query;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const orders = await Order.find({ userId: id });
        res.status(200).json({ success: true, orders });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const order = new Order(req.body);
        await order.save();
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
