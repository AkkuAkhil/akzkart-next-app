import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ProductContainer from '../../components/Products/ProductContainer';
import { fetchAllProducts } from '../../helpers/db-utils';

const ProductsPage = props => {
  const [products, setProducts] = useState(props.products);

  const { data } = useSWR('/api/products', url =>
    fetch(url).then(res => res.json())
  );

  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);

  if (!products || !products.length) return <h1>No Products</h1>;

  return (
    <div>
      <h1>All Products</h1>
      <ProductContainer products={products} />
    </div>
  );
};

export const getStaticProps = async () => {
  const products = await fetchAllProducts();
  return { props: { products } };
};

export default ProductsPage;
