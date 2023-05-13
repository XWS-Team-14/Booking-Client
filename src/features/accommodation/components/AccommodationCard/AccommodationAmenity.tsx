import { Tag } from 'antd';

interface AccommodationAmenityProps {
  name: string;
  color?: string;
}

export const AccommodationAmenity = ({
  name,
  color,
}: AccommodationAmenityProps) => {
  return (
    <Tag bordered={false} color={color ? color : 'cyan-inverse'}>
      {name}
    </Tag>
  );
};
