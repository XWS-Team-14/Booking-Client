import Button from '@/common/components/button/Button';
import { database } from '@/common/services/Firebase';
import { selectId } from '@/common/store/slices/authSlice';
import { Avatar, Badge, List } from 'antd';
import dayjs from 'dayjs';
import { ref, update } from 'firebase/database';
import { useSelector } from 'react-redux';
import styles from '../styles/notifications.module.scss';
import Notification from '../types/Notification';

interface NotificationListProps {
  type: 'all' | 'unread';
  data: Notification[];
}

const NotificationList = ({ type, data }: NotificationListProps) => {
  const userId = useSelector(selectId);

  const markAsRead = (notificationKey: string) => {
    update(ref(database, `notifications/${userId}/${notificationKey}`), {
      status: 'read',
    });
  };

  return (
    <List
      className={styles.list}
      itemLayout="horizontal"
      dataSource={data}
      locale={{ emptyText: 'No new notifications.' }}
      renderItem={(item, index) => (
        <List.Item
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <List.Item.Meta
            style={{
              width: '100%',
            }}
            avatar={<Avatar src={item.sender.picture} />}
            title={
              <div className={styles.messageTitle}>
                <p>{item.title}</p>{' '}
                {item.status === 'unread' && <Badge dot offset={[2, 8]} />}
              </div>
            }
            description={item.content}
          />
          <div className={styles.timestamp}>
            <p>{dayjs(item.timestamp).format('MMMM DD, YYYY HH:mm')}</p>
            <Button
              type="transparent"
              text="Mark as read"
              action={() => markAsRead(item.key)}
            />
          </div>
        </List.Item>
      )}
    />
  );
};

export default NotificationList;
