import { useContext } from 'react';
import classes from './Notification.module.css';
import NotificationContext from '../../contexts/NotificationContext';

const Notification = ({ title, message, status }) => {
  const { hideNotification } = useContext(NotificationContext);
  const statusClasses = [classes.notification];

  if (status === 'success') statusClasses.push(classes.success);
  else if (status === 'error') statusClasses.push(classes.error);
  else if (status === 'pending') statusClasses.push(classes.pending);

  return (
    <div className={statusClasses.join(' ')} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
