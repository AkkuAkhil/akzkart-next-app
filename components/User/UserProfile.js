import Image from 'next/image';
import { myLoader } from '../../helpers/utils';
import classes from './UserProfile.module.css';

const UserProfile = ({ user }) => {
  return (
    <div className={classes.UserProfileContainer}>
      <div className={classes.UserProfile}>
        <div className={classes.userImageContainer}>
          <Image
            className={classes.userImage}
            loader={myLoader}
            alt={user.name}
            src={user.image}
            width={80}
            height={80}
          />
        </div>

        <div className={classes.UserDetails}>
          <p className={classes.userName}>{user.name}</p>
          <p className={classes.userEmail}>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
