import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import OrderContainer from '../../../components/Orders/OrderContainer';
import { fetchMyOrders } from '../../../helpers/db-utils';
import { generateUserId } from '../../../helpers/utils';

const OrdersPage = props => {
  const [orders, setOrders] = useState(props.orders);

  const { data } = useSWR(`/api/orders/${props.userId}`, url =>
    fetch(url).then(res => res.json())
  );

  useEffect(() => {
    if (data) setOrders(data.orders);
  }, [data]);

  return <OrderContainer orders={orders} name={props.name} />;
};

export const getServerSideProps = async context => {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/', permanent: false } };
  const user = session.user;
  const name = session.user.name;

  const userId = generateUserId(user.email);
  const orders = await fetchMyOrders(userId);

  return { props: { userId, orders, name } };
};

export default OrdersPage;
