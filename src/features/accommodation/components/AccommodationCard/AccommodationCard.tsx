import { Avatar, Card, Divider } from 'antd';

const { Meta } = Card;
//Missing props.

import UserIcon from '@/features/user/components/icon/UserIcon';
import { AccommodationAmenity } from './AccommodationAmenity';
import styles from './AccommodationCard.module.scss';
import { AccommodationHeader } from './AccommodationHeader';
import { AccommodationImages } from './AccommodationImages';

const AccommodationCard = () => {
  const imagesExample = [
    'https://cf.bstatic.com/xdata/images/hotel/square600/255152681.webp?k=b1f184a5e6de8a12196b0f0a18b76a6a93db7c65cce2d0dd4507ab2a606ef539&o=&s=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/399559679.jpg?k=4d88298c3e2495748558ebd7039459f2c77e9a3709a81266c2784ab61eca4cb1&o=&hp=1',
  ];
  return (
    <Card
      style={{ width: 400 }}
      cover={<AccommodationImages images={imagesExample} />}
    >
      <Meta
        title={<AccommodationHeader title="Hotel Pupin" rating={4.3869} />}
        description="Ulica, Novi Sad, Serbia"
      />
      <Divider orientation="left" orientationMargin="0">
        Guests
      </Divider>
      <b>Minimum:</b> 1<br />
      <b>Maximum:</b> 3
      <Divider orientation="left" orientationMargin="0">
        Amenities
      </Divider>
      <div className={styles.amenities}>
        <AccommodationAmenity name="Wi-Fi" />
        <AccommodationAmenity name="Air conditioning" />
      </div>
      <Divider orientation="left" orientationMargin="0">
        Host
      </Divider>
      <Avatar src={<UserIcon type="male" size={0} />} /> Mr. Host
    </Card>
  );
};

export default AccommodationCard;
