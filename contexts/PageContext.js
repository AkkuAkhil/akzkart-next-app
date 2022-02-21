import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import { PER_PAGE_ITEMS } from '../helpers/constants';
import { generateUserId } from '../helpers/utils';

const PageContext = createContext({
  page: 0,
  productLastPage: 0,
  adminLastPage: 0,
  changePage: () => {}
});

export const PageProvider = props => {
  const [page, setPage] = useState(1);
  const [productLastPage, setProductLastPage] = useState(1);
  const [adminLastPage, setAdminLastPage] = useState(1);
  const [userId, setUserId] = useState('0');

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) setUserId(generateUserId(session.user.email));
  }, [session]);

  const getDocumentCount = async () => {
    const response = await fetch('/api/products/count');
    const { count, success } = await response.json();
    if (success) setProductLastPage(Math.ceil(count / PER_PAGE_ITEMS));
  };

  const getAdminDocumentCount = async () => {
    const response = await fetch(`/api/products/count/${userId}`);
    const { count, success } = await response.json();
    if (success) setAdminLastPage(Math.ceil(count / PER_PAGE_ITEMS));
  };

  useEffect(() => {
    getDocumentCount();
  }, []);

  useEffect(() => {
    if (userId && userId !== '0') getAdminDocumentCount();
  }, [userId]);

  const changePage = newPage => setPage(newPage);

  const context = { page, productLastPage, adminLastPage, changePage };

  return (
    <PageContext.Provider value={context}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContext;
