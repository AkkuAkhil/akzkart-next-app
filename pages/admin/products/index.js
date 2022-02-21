import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ProductContainer from '../../../components/Products/ProductContainer';
import { fetchMyProducts } from '../../../helpers/db-utils';
import { generateUserId } from '../../../helpers/utils';

const AdminProductsPage = props => {
  const [products, setProducts] = useState(props.products);
  const URL = `/api/user/${props.userId}/1`;

  const { data } = useSWR(URL, url => fetch(url).then(res => res.json()));

  const setLatestProducts = async () => {
    const response = await fetch(URL);
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
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/', permanent: false } };
  const user = session.user;

  const userId = generateUserId(user.email);
  const products = await fetchMyProducts(userId, 1);

  return { props: { userId, products } };
};

export default AdminProductsPage;
