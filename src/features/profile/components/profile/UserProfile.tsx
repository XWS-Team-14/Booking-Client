import UserIcon from '../userIcon/UserIcon';
import styles from './UserProfile.module.scss';
const UserProfile = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <UserIcon type="female" size={100} />
        <div className={styles.title}>
          <h1>Sanja Petrović</h1>
          <h2>Host</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
