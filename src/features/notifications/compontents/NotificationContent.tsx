import { Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import styles from '../styles/notifications.module.scss';
import NotificationList from './NotificationList';

const NotificationContent = () => {
  const [type, setType] = useState<'all' | 'unread'>('all');

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `All`,
      children: <NotificationList data={undefined} />,
    },
    {
      key: 'unread',
      label: `Unread`,
      children: <NotificationList />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Notifications</p>
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
