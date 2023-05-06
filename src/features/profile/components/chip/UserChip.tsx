import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import styles from './UserChip.module.scss';

const UserChip = () => {
  return (
    <div className={styles.wrapper}>
      <Avatar icon={<UserOutlined />} size={30}></Avatar> Sanja Petrović
    </div>
  );
};

export default UserChip;
