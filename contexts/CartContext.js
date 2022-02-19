import { createContext, useEffect, useState } from 'react';

const CartContext = createContext({
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {}
});

export const CartProvider = props => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const previousCart = localStorage.getItem('cart');
    setCart(JSON.parse(previousCart));
  }, []);

  useEffect(() => {
    if (cart && cart?.length) {
      const total = cart.reduce((acc, item) => acc + item.quantity, 0);
      setTotalQuantity(total);
      const totalPrice = cart.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      setTotalPrice(totalPrice);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      setTotalQuantity(0);
      setTotalPrice(0);
    }
  }, [cart]);

  const addToCart = product => {
    setCart(cart => {
      if (cart && cart.length) {
        if (cart.find(item => item._id === product._id)) {
          const index = cart.findIndex(item => item._id === product._id);
          cart[index].quantity = product.quantity;
          return [...cart];
        }
        return [...cart, product];
      }
      return [product];
    });
  };

  const removeFromCart = productId => {
    const newCart = cart.filter(item => item._id !== productId);
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const context = {
    cart,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
