import XwsButton from '@/common/components/button/Button';
import { database } from '@/common/services/Firebase';
import { selectId } from '@/common/store/slices/authSlice';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Tabs, TabsProps, Tooltip } from 'antd';
import { ref, update } from 'firebase/database';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/notifications.module.scss';
import Notification from '../types/Notification';
import NotificationList from './NotificationList';

interface NotificationContentProps {
  allNotifications: Notification[];
  unreadNotifications: Notification[];
}
const NotificationContent = ({
  allNotifications,
  unreadNotifications,
}: NotificationContentProps) => {
  const [type, setType] = useState<'all' | 'unread'>('all');
  const userId = useSelector(selectId);

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `All`,
      children: <NotificationList type="all" data={allNotifications} />,
    },
    {
      key: 'unread',
      label: `Unread`,
      children: <NotificationList type="unread" data={unreadNotifications} />,
    },
  ];

  const markAllAsRead = () => {
    unreadNotifications.forEach((unreadNotification) => {
      update(
        ref(database, `notifications/${userId}/${unreadNotification.key}`),
        {
          status: 'read',
        }
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.title}>Notifications</p>
        <div className={styles.settings}>
          <XwsButton
            type="transparent"
            text="Mark all as read"
            action={markAllAsRead}
          />
          <Tooltip
            title="Manage notifications"
            placement="bottom"
            color="rgba(56, 82, 117, 0.5)"
          >
            <Button shape="circle" icon={<SettingOutlined />} />
          </Tooltip>
        </div>
      </div>
      <div className={styles.buttons}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          size="large"
          tabBarStyle={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default NotificationContent;
