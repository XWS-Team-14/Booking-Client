import { selectUser } from '@/common/store/slices/authSlice';
import { useSelector } from 'react-redux';
import UserIcon from '../icon/UserIcon';
import styles from './UserChip.module.scss';

const UserChip = () => {
  const user = useSelector(selectUser);
  return (
    <div className={styles.wrapper}>
      <UserIcon type={user.gender} size={30} /> {user.firstName} {user.lastName}
    </div>
  );
};

export default UserChip;
