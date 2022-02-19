import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ProductContainer from '../../../components/Products/ProductContainer';
import { fetchAllProducts } from '../../../helpers/db-utils';

const AdminProductsPage = props => {
  const [products, setProducts] = useState(props.products);

  const { data } = useSWR('/api/products', url =>
    fetch(url).then(res => res.json())
  );

  const setLatestProducts = async () => {
    const response = await fetch('/api/products');
    const { products } = await response.json();
    setProducts(products);
  };

  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);

  return (
    <ProductContainer
      products={products}
      admin={true}
      setLatestProducts={setLatestProducts}
    />
  );
};

export const getServerSideProps = async context => {
  const products = await fetchAllProducts();
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/', permanent: false } };
  const user = session.user;
  return { props: { user, products } };
};

export default AdminProductsPage;
