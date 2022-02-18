import { Rating } from '@mui/material';
import Image from 'next/image';
import { Truck } from 'react-feather';
import { myLoader } from '../../helpers/utils';
import classes from './ProductDetail.module.css';

const ProductDetail = ({ product }) => {
  return (
    <div className={classes.productContainer}>
      <div className={classes.productImageDiv}>
        <Image
          loader={myLoader}
          alt={product.name}
          src={product.image}
          width={350}
          height={300}
        />
      </div>
      <div className={classes.productDetailsDiv}>
        <p className={classes.productName}>{product.name}</p>
        <p className={classes.productPrice}>
          ₹{(Math.round(product.price * 100) / 100).toFixed(2)}
        </p>{' '}
        <Rating
          name='MyRating'
          size='large'
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />{' '}
        <p className={classes.productDelivery}>
          <span className='iconGroup'>
            <Truck className='icon icon-s' /> Free Delivery
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
