import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';

interface NotificationIconProps {
  count?: number;
}

const NotificationIcon = ({ count }: NotificationIconProps) => {
  return (
    <Badge dot={!!count && count > 0} offset={[-11, 10]}>
      <Avatar
        style={{
          backgroundColor: 'white',
          color: 'black',
          cursor: 'pointer',
        }}
        icon={<BellOutlined />}
      />
    </Badge>
  );
};

export default NotificationIcon;
