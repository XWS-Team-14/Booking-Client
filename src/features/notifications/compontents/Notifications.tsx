import { Popover } from 'antd';
import NotificationContent from './NotificationContent';
import NotificationIcon from './NotificationIcon';

const Notifications = () => {
  return (
    <Popover content={<NotificationContent />} trigger="click">
      <div>
        <NotificationIcon />
      </div>
    </Popover>
  );
};

export default Notifications;
