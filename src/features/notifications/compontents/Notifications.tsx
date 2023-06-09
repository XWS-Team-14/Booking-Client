import { database } from '@/common/services/Firebase';
import { selectId } from '@/common/store/slices/authSlice';
import { snapshotToArray } from '@/common/utils/snapshotToArray';
import { Popover } from 'antd';
import dayjs from 'dayjs';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NotificationContent from './NotificationContent';
import NotificationIcon from './NotificationIcon';

const Notifications = () => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<
    Notification[]
  >([]);

  const userId = useSelector(selectId);

  useEffect(() => {
    const notificationsRef = ref(database, `notifications/${userId}`);
    onValue(notificationsRef, (snapshot) => {
      const notifications = snapshotToArray(snapshot).sort(
        (a, b) =>
          dayjs(b.timestamp).toDate().valueOf() -
          dayjs(a.timestamp).toDate().valueOf()
      );
      setAllNotifications(notifications);
      setUnreadNotifications(
        notifications.filter((notification) => notification.status === 'unread')
      );
    });
  }, []);
  return (
    <Popover
      content={
        <NotificationContent
          allNotifications={allNotifications}
          unreadNotifications={unreadNotifications}
        />
      }
      trigger="click"
    >
      <div>
        <NotificationIcon count={unreadNotifications.length} />
      </div>
    </Popover>
  );
};

export default Notifications;
