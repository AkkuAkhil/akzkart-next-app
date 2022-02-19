import classes from './OrderItem.module.css';
import OrderItemDetail from './OrderItemDetail';

const OrderItem = ({ order }) => {
  const options = {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const myDate = new Date(Number(order.date)).toLocaleString('en-US', options);

  return (
    <div className={classes.orderItem}>
      <p className={classes.orderDate}>{myDate}</p>
      {order.cart.map(product => (
        <OrderItemDetail key={product._id} product={product} />
      ))}
      <p className={classes.orderTotalPrice}>
        Total ₹{(Math.round(order.totalPrice * 100) / 100).toFixed(2)} Paid
      </p>
    </div>
  );
};

export default OrderItem;
