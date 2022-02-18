import { useContext } from 'react';
import CartContext from '../../contexts/CartContext.js';
import CartItem from './CartItem.js';
import classes from './CartContainer.module.css';
import { ShoppingBag, ShoppingCart, XCircle } from 'react-feather';
import { delay } from '../../helpers/utils.js';

const CartContainer = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  if (!cart || !cart.length) {
    return (
      <div className={classes.CartContainer}>
        <h1>Your cart is empty</h1>
      </div>
    );
  }

  const checkout = async () => {
    alert('Paying');
    await delay(2000);
    alert('Payment successful');
    clearCart();
  };

  return (
    <div className={classes.CartContainer}>
      <h1>Hi user, Your Cart</h1>
      {cart.map(product => (
        <CartItem key={product._id} product={product} />
      ))}
      <div className={classes.buttonContainer}>
        <button onClick={checkout} className={classes.checkoutButton}>
          <span className='iconGroup'>
            <ShoppingBag className='icon icon-l icon-margin' />
            Pay ₹{(Math.round(totalPrice * 100) / 100).toFixed(2)}
          </span>
        </button>
        <button onClick={clearCart} className={classes.clearButton}>
          <span className='iconGroup'>
            Clear
            <ShoppingCart className='icon icon-l icon-margin' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CartContainer;
