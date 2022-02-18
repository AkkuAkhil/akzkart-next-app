import ProductCard from '../UI/ProductCard';
import ProductItem from './ProductItem';
import classes from './ProductContainer.module.css';

const ProductContainer = ({ products, admin, setLatestProducts }) => {
  if (!products || !products.length)
    return (
      <div className={classes.container}>
        <h1>No Products</h1>
      </div>
    );

  return (
    <div className={classes.container}>
      {products.map(product => (
        <ProductCard key={product._id} link={`/products/${product._id}`}>
          <ProductItem
            product={product}
            admin={admin}
            setLatestProducts={setLatestProducts}
          />
        </ProductCard>
      ))}
    </div>
  );
};

export default ProductContainer;
