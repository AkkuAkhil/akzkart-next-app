import Image from 'next/image';
import { useRouter } from 'next/router';
import { Edit, MinusSquare, PlusSquare, Trash, Truck } from 'react-feather';
import { myLoader } from '../../helpers/utils.js';
import classes from './ProductItem.module.css';
import { Rating } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../contexts/CartContext.js';
import NotificationContext from '../../contexts/NotificationContext.js';

const ProductItem = ({ product, admin, setLatestProducts }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { showNotification } = useContext(NotificationContext);

  let existingCartItem;
  if (cart && cart?.length)
    existingCartItem = cart.find(item => item._id === product._id);

  useEffect(() => {
    if (existingCartItem) setQuantity(existingCartItem.quantity);
  }, [existingCartItem]);

  const deleteHandler = async event => {
    event.preventDefault();
    showNotification({
      title: 'Deleting Product',
      message: 'Deleting.',
      status: 'pending'
    });

    const response = await fetch(`/api/products/${product._id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      showNotification({
        title: 'Deleting Product',
        message: 'Product Deleted Succesfully.',
        status: 'success'
      });
      router.push('/admin/products/page/1');
    } else {
      showNotification({
        title: 'Deleting Product',
        message: 'Error Occurred while Deleting Product.',
        status: 'error'
      });
    }

    setLatestProducts();
  };

  const editHandler = async event => {
    event.preventDefault();
    router.push(`/admin/products/edit/${product._id}`);
  };

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
    <div className={classes.productItem}>
      <Image
        className={classes.productImage}
        loader={myLoader}
        alt={product.name}
        src={product.image}
        width={256}
        height={256}
      />
      <div className={classes.productDetails}>
        <div>
          <p className={classes.productName}>{product.name}</p>
        </div>
        <div className={classes.productDetailsSection}>
          <div>
            <p className={classes.productPrice}>
              ₹{(Math.round(product.price * 100) / 100).toFixed(2)}
            </p>
            <Rating
              name='MyRating'
              size='small'
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
            <p className={classes.productDelivery}>
              <span className='iconGroup'>
                <Truck className='icon icon-s' /> Free Delivery
              </span>
            </p>
          </div>
          <div className={classes.quantityContainer}>
            <button
              className={classes.decreaseButton}
              onClick={decreaseHandler}
            >
              <MinusSquare />
            </button>
            <p className={classes.quantityText}>{quantity}</p>
            <button
              className={classes.increaseButton}
              onClick={increaseHandler}
            >
              <PlusSquare />
            </button>
          </div>
        </div>

        {admin && (
          <div className={classes.buttonContainer}>
            <button className={classes.editButton} onClick={editHandler}>
              <span className='iconGroup'>
                <Edit className='icon icon-s' /> Edit
              </span>
            </button>
            <button className={classes.deleteButton} onClick={deleteHandler}>
              <span className='iconGroup'>
                <Trash className='icon icon-s' /> Delete
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
