import { SettingOutlined } from '@ant-design/icons';
import { Button, Tabs, TabsProps, Tooltip } from 'antd';
import { useState } from 'react';
import styles from '../styles/notifications.module.scss';
import NotificationList from './NotificationList';

const NotificationContent = () => {
  const [type, setType] = useState<'all' | 'unread'>('all');

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `All`,
      children: <NotificationList />,
    },
    {
      key: 'unread',
      label: `Unread`,
      children: <NotificationList />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.title}>Notifications</p>
        <Tooltip
          title="Manage notifications"
          placement="rightBottom"
          color="rgba(56, 82, 117, 0.5)"
        >
          <Button shape="circle" icon={<SettingOutlined />} />
        </Tooltip>
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
