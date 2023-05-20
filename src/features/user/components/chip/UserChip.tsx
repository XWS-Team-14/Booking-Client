import UserIcon from '../icon/UserIcon';
import styles from './UserChip.module.scss';

interface UserChipProps {
  gender: 'male' | 'female';
  size: number;
  name: string;
}

const UserChip = ({ gender, size, name }: UserChipProps) => {
  return (
    <div className={styles.wrapper}>
      <UserIcon type={gender} size={size} /> {name}
    </div>
  );
};

export default UserChip;
