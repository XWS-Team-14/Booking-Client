import { getRoundedRating } from '@/common/utils/getRoundedRating';
import { StarFilled } from '@ant-design/icons';
import { Tag } from 'antd';
import UserIcon from '../icon/UserIcon';
import styles from './UserChip.module.scss';

interface UserChipProps {
  gender: 'male' | 'female';
  size: number;
  name: string;
  featured?: boolean;
  hostRating?: number;
}

const UserChip = ({
  gender,
  size,
  name,
  featured,
  hostRating,
}: UserChipProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <UserIcon type={gender} size={size} featured={featured} />
      </div>
      <div className={styles.text}>
        <div className={styles.text__name}>
          {' '}
          {name}{' '}
          {hostRating !== undefined && (
            <Tag color="#71B8E4" icon={<StarFilled />}>
              {hostRating === 0 ? (
                <>No rating</>
              ) : (
                <>{getRoundedRating(hostRating)}</>
              )}
            </Tag>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserChip;
