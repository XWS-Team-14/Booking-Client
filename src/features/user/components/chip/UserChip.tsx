import UserIcon from '../icon/UserIcon';
import styles from './UserChip.module.scss';

const UserChip = () => {
  return (
    <div className={styles.wrapper}>
      <UserIcon type="female" size={30} /> Sanja Petrović
    </div>
  );
};

export default UserChip;
