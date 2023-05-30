import { database } from '@/common/services/Firebase';
import { selectId } from '@/common/store/slices/authSlice';
import { snapshotToArray } from '@/common/utils/snapshotToArray';
import { Avatar, List } from 'antd';
import { onValue, push, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/notifications.module.scss';

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
        content: 'blabla',
        status: 'unread',
        sender: {
          name: 'Miss Guest2',
          id: '12345',
          picture: '',
        },
        receiver: {
          id: '234',
        },
      });
    }
    writeUserData();
    const starCountRef = ref(database, `notifications/${userId}`);
    onValue(starCountRef, (snapshot) => {
      setAllNotifications(snapshotToArray(snapshot));
    });
  }, []);
  return (
    <List
      className={styles.list}
      itemLayout="horizontal"
      dataSource={allNotifications}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.sender.picture} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};

export default NotificationList;
