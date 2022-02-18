import { useContext } from 'react';
import CartContext from '../../contexts/CartContext.js';
import CartItem from './CartItem.js';
import classes from './CartContainer.module.css';

const CartContainer = () => {
  const { cart } = useContext(CartContext);

  if (!cart || !cart.length) {
    return (
      <div className={classes.CartContainer}>
        <h1>Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className={classes.CartContainer}>
      <h1>Hi user, Your Cart</h1>
      {cart.map(product => (
        <CartItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default CartContainer;
