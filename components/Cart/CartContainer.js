import { useContext } from 'react';
import CartContext from '../../contexts/CartContext.js';
import CartItem from './CartItem.js';
import classes from './CartContainer.module.css';
import { ShoppingBag, ShoppingCart } from 'react-feather';
import { delay, generateUserId, getFirstName } from '../../helpers/utils.js';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const CartContainer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  if (!cart || !cart.length) {
    return (
      <div className={classes.CartContainer}>
        <h1>
          Hi {getFirstName(session?.user?.name || 'User')}, Your Cart is Empty
        </h1>
      </div>
    );
  }

  const checkout = async () => {
    if (!session) {
      alert('Please Login to Checkout');
      return signIn('google');
    }

    alert('Paying');
    await delay(1000);
    const userId = generateUserId(session?.user?.email || '');

    const response = await fetch(`/api/orders/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart,
        totalPrice,
        date: Date.now(),
        userId: generateUserId(session?.user?.email)
      })
    });

    if (response.ok) {
      alert('Payment successful');
      clearCart();
      router.push('/admin/orders');
    } else {
      alert('Payment failed');
    }
  };

  return (
    <div className={classes.CartContainer}>
      <h1>Hi {getFirstName(session?.user?.name || 'User')}, Your Cart</h1>
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
