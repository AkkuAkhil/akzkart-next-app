import { getSession } from 'next-auth/react';
import ProductEditForm from '../../../../components/Products/ProductEditForm';
import { fetchProductById } from '../../../../helpers/db-utils';

const ProductsPage = ({ product }) => {
  return <ProductEditForm product={product} />;
};

export const getServerSideProps = async context => {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/', permanent: false } };
  const user = session.user;

  const { productId } = context.params;
  const product = await fetchProductById(productId);

  return { props: { user, product } };
};

export default ProductsPage;
