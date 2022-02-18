import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ProductContainer from '../components/Products/ProductContainer';
import { fetchAllProducts } from '../helpers/db-utils';

const HomePage = props => {
  const [products, setProducts] = useState(props.products);

  const { data } = useSWR('/api/products', url =>
    fetch(url).then(res => res.json())
  );

  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);

  return <ProductContainer products={products} />;
};

export const getStaticProps = async () => {
  const products = await fetchAllProducts();
  return { props: { products } };
};

export default HomePage;
