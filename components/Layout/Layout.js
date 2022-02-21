import { Fragment, useContext } from 'react';
import NotificationContext from '../../contexts/NotificationContext';
import Notification from '../UI/Notification';
import MainHeader from './MainHeader';

const Layout = props => {
  const { notification } = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
