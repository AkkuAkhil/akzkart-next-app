import Image from 'next/image';
import { MinusSquare, PlusSquare, Truck } from 'react-feather';
import { myLoader } from '../../helpers/utils.js';
import { useContext, useState } from 'react';
import CartContext from '../../contexts/CartContext.js';
import classes from './CartItem.module.css';

const CartItem = ({ product }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(product.quantity);

  const decreaseHandler = async event => {
    event.preventDefault();
    setQuantity(quantity => {
      if (quantity === 1 || quantity === 0) return 0;
      return quantity - 1;
    });

    if (quantity - 1 === 0) {
      removeFromCart(product._id);
      return;
    }
    if (quantity >= 1) addToCart({ ...product, quantity: quantity - 1 });
  };

  const increaseHandler = async event => {
    event.preventDefault();
    setQuantity(quantity => {
      if (quantity === 10) return 10;
      return quantity + 1;
    });
    if (quantity <= 9) addToCart({ ...product, quantity: quantity + 1 });
  };

  return (
    <div className={classes.cartContainer}>
      <Image
        className={classes.cartImage}
        loader={myLoader}
        alt={product.name}
        src={product.image}
        width={90}
        height={90}
      />
      <div className={classes.cartDetails}>
        <div>
          <p className={classes.cartName}>{product.name}</p>
        </div>
        <div className={classes.productDetailsSection}>
          <div>
            <p className={classes.cartPrice}>
              ₹{(Math.round(product.price * 100) / 100).toFixed(2)}
            </p>
            <p className={classes.cartDelivery}>
              <span className='iconGroup'>
                <Truck className='icon icon-s' /> Free Delivery
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className={classes.quantityContainer}>
        <button className={classes.decreaseButton} onClick={decreaseHandler}>
          <MinusSquare />
        </button>
        <p className={classes.quantityText}>{quantity}</p>
        <button className={classes.increaseButton} onClick={increaseHandler}>
          <PlusSquare />
        </button>
      </div>
      <div className={classes.TotalAmount}>
        <p className={classes.TotalAmountText}>
          ₹{(Math.round((product.price * 100) / 100) * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
