import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: function (data) {},
  hideNotification: function () {}
});

export const NotificationProvider = props => {
  const [notification, setNotification] = useState();

  useEffect(() => {
    if (
      notification?.status === 'success' ||
      notification?.status === 'error'
    ) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = data => setNotification(data);
  const hideNotification = () => setNotification(null);

  const context = { notification, showNotification, hideNotification };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
