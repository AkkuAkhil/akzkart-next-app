import { useContext, useState } from 'react';
import CartContext from '../../contexts/CartContext.js';
import CartItem from './CartItem.js';
import classes from './CartContainer.module.css';
import { Loader, ShoppingBag, ShoppingCart } from 'react-feather';
import { delay, generateUserId, getFirstName } from '../../helpers/utils.js';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NotificationContext from '../../contexts/NotificationContext.js';

const CartContainer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const [clicked, setClicked] = useState(false);
  const { showNotification } = useContext(NotificationContext);

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
    setClicked(!clicked);

    if (!session) {
      alert('Please Login to Checkout');
      return signIn('google');
    }

    showNotification({
      title: `Paying ₹${(Math.round(totalPrice * 100) / 100).toFixed(2)}`,
      message: 'Paying.',
      status: 'pending'
    });

    await delay(3000);
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
      showNotification({
        title: `Paying ₹${(Math.round(totalPrice * 100) / 100).toFixed(2)}`,
        message: 'Payment Succesful.',
        status: 'success'
      });
      setClicked(!clicked);
      clearCart();
      router.push('/admin/orders');
    } else {
      showNotification({
        title: `Paying ₹${(Math.round(totalPrice * 100) / 100).toFixed(2)}`,
        message: 'Payment Failed.',
        status: 'error'
      });
      setClicked(!clicked);
    }
  };

  return (
    <div className={classes.CartContainer}>
      <h1>Hi {getFirstName(session?.user?.name || 'User')}, Your Cart</h1>
      {cart.map(product => (
        <CartItem key={product._id} product={product} />
      ))}
      <div className={classes.buttonContainer}>
        {clicked ? (
          <button className={classes.checkoutButton}>
            <span className='iconGroup'>
              Paying ₹{(Math.round(totalPrice * 100) / 100).toFixed(2)}
              <Loader className='icon icon-l icon-margin  icon-rotate' />
            </span>
          </button>
        ) : (
          <button onClick={checkout} className={classes.checkoutButton}>
            <span className='iconGroup'>
              <ShoppingBag className='icon icon-l icon-margin' />
              Pay ₹{(Math.round(totalPrice * 100) / 100).toFixed(2)}
            </span>
          </button>
        )}

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
