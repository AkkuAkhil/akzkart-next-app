import OrderItem from './OrderItem';
import classes from './OrderContainer.module.css';
import { getFirstName } from '../../helpers/utils';

const OrderContainer = ({ orders, name }) => {
  if (!orders || !orders.length)
    return (
      <div className={classes.container}>
        <h1>No Orders Yet</h1>
      </div>
    );

  return (
    <div className={classes.container}>
      <h1>Hi {getFirstName(name || 'User')}, Your Orders</h1>
      {orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrderContainer;
