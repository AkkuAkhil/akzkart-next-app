import { getSession } from 'next-auth/react';
import ProductAddForm from '../../../components/Products/ProductAddForm';

const AddProductPage = ({ user }) => {
  return <ProductAddForm email={user.email} />;
};

export const getServerSideProps = async context => {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/', permanent: false } };
  const user = session.user;
  return { props: { user } };
};

export default AddProductPage;
