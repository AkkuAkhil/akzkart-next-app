import Image from 'next/image';
import { useRouter } from 'next/router';
import { Edit, Trash, Truck } from 'react-feather';
import { myLoader } from '../../helpers/utils.js';
import classes from './ProductItem.module.css';
import { Rating } from '@mui/material';

const ProductItem = ({ product, admin, setLatestProducts }) => {
  const router = useRouter();

  const deleteHandler = async event => {
    event.preventDefault();
    await fetch(`/api/products/${product._id}`, {
      method: 'DELETE'
    });
    setLatestProducts();
  };

  const editHandler = async event => {
    event.preventDefault();
    router.push(`/admin/products/edit/${product._id}`);
  };

  return (
    <div className={classes.productItem}>
      <Image
        className={classes.productImage}
        loader={myLoader}
        alt={product.name}
        src={product.image}
        width={256}
        height={220}
      />
      <div className={classes.productDetails}>
        <p className={classes.productName}>{product.name}</p>
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
