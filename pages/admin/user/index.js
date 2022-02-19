import { getSession } from 'next-auth/react';
import UserProfile from '../../../components/User/UserProfile';

const UserPage = ({ user }) => {
  return <UserProfile user={user} />;
};

export const getServerSideProps = async context => {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/', permanent: false } };
  const user = session.user;
  return { props: { user } };
};

export default UserPage;
