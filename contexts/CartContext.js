import { createContext, useEffect, useState } from 'react';

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {}
});

export const CartProvider = props => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const previousCart = localStorage.getItem('cart');
    setCart(JSON.parse(previousCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = product => {
    setCart(cart => {
      if (cart.find(item => item._id === product._id)) {
        const index = cart.findIndex(item => item._id === product._id);
        cart[index].quantity = product.quantity;
        return [...cart];
      }
      return [...cart, product];
    });
  };

  const removeFromCart = productId => {
    const newCart = cart.filter(item => item._id !== productId);
    setCart(newCart);
  };

  const context = { cart, addToCart, removeFromCart };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
