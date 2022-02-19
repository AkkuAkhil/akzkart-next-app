import Image from 'next/image';
import classes from './OrderItemDetail.module.css';
import { myLoader } from '../../helpers/utils';

const OrderItemDetail = ({ product }) => {
  return (
    <div className={classes.orderItemDetailContainer}>
      <div className={classes.orderItemDetail}>
        <Image
          className={classes.orderImage}
          loader={myLoader}
          alt={product.name}
          src={product.image}
          width={60}
          height={60}
        />
        <div>
          <p className={classes.orderName}>{product.name}</p>
          <p className={classes.orderPrice}>
            ₹{(Math.round(product.price * 100) / 100).toFixed(2)}
          </p>
        </div>
      </div>
      <p className={classes.orderQuantity}>{product.quantity}</p>
    </div>
  );
};

export default OrderItemDetail;
