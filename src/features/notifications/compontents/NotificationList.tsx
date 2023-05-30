import { database } from '@/common/services/Firebase';
import { selectId } from '@/common/store/slices/authSlice';
import { snapshotToArray } from '@/common/utils/snapshotToArray';
import { Avatar, List } from 'antd';
import dayjs from 'dayjs';
import { onValue, push, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/notifications.module.scss';
import Notification from '../types/Notification';

const NotificationList = () => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<
    Notification[]
  >([]);

  const userId = useSelector(selectId);

  useEffect(() => {
    function writeUserData() {
      push(ref(database, `notifications/${userId}`), {
        type: 'reservation-created',
        title: 'New reservation',
        content:
          'Miss Guest has created a reservation request for your accommodation Prezident hotel.',
        status: 'unread',
        sender: {
          name: 'Miss Guest',
          id: '1234',
          picture: '',
        },
        receiver: {
          id: '234',
        },
        timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    const starCountRef = ref(database, `notifications/${userId}`);
    onValue(starCountRef, (snapshot) => {
      setAllNotifications(
        snapshotToArray(snapshot).sort(
          (a, b) =>
            dayjs(b.timestamp).toDate().valueOf() -
            dayjs(a.timestamp).toDate().valueOf()
        )
      );
    });
  }, []);
  return (
    <List
      className={styles.list}
      itemLayout="horizontal"
      dataSource={allNotifications}
      renderItem={(item, index) => (
        <List.Item
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <List.Item.Meta
            style={{ width: '100%' }}
            avatar={<Avatar src={item.sender.picture} />}
            title={item.title}
            description={item.content}
          />
          <p className={styles.timestamp}>
            {dayjs(item.timestamp).format('MMMM DD, YYYY HH:mm')}
          </p>
        </List.Item>
      )}
    />
  );
};

export default NotificationList;
