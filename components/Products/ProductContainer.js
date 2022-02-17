import { Fragment } from 'react';
import ProductCard from '../UI/ProductCard';
import ProductItem from './ProductItem';

const ProductContainer = ({ products, admin, setLatestProducts }) => {
  return (
    <Fragment>
      {products.map(product => (
        <ProductCard key={product._id} link={`/products/${product._id}`}>
          <ProductItem
            product={product}
            admin={admin}
            setLatestProducts={setLatestProducts}
          />
        </ProductCard>
      ))}
    </Fragment>
  );
};

export default ProductContainer;
