import UserIcon from '../icon/UserIcon';
import styles from './UserChip.module.scss';

interface UserChipProps {
  gender: 'male' | 'female';
  size: number;
  name: string;
  featured?: boolean;
}

const UserChip = ({ gender, size, name, featured }: UserChipProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <UserIcon type={gender} size={size} featured={featured} />
      </div>
      <div className={styles.text}>
        <div className={styles.text__name}> {name}</div>
        {featured && <div className={styles.text__featured}>Featured host</div>}
      </div>
    </div>
  );
};

export default UserChip;
