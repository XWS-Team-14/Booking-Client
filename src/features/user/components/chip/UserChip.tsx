import { selectUser } from '@/common/store/slices/authSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import UserIcon from '../icon/UserIcon';
import styles from './UserChip.module.scss';

const UserChip = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div className={styles.wrapper}>
      <UserIcon type={user.gender} size={30} /> {user.firstName} {user.lastName}
    </div>
  );
};

export default UserChip;
