import { Avatar, Card, Divider } from 'antd';

const { Meta } = Card;
//Missing props.

import Button from '@/common/components/button/Button';
import { selectRole } from '@/common/store/slices/authSlice';
import UserIcon from '@/features/user/components/icon/UserIcon';
import { useSelector } from 'react-redux';
import { AccommodationAmenity } from './AccommodationAmenity';
import styles from './AccommodationCard.module.scss';
import { AccommodationHeader } from './AccommodationHeader';
import { AccommodationImages } from './AccommodationImages';
import { SearchAccommodationDto } from '@/features/search/types/SearchAccommodationsDto';

const AccommodationCard = (item: SearchAccommodationDto) => {
  const role = useSelector(selectRole);
  const imagesExample = [
    'https://cf.bstatic.com/xdata/images/hotel/square600/255152681.webp?k=b1f184a5e6de8a12196b0f0a18b76a6a93db7c65cce2d0dd4507ab2a606ef539&o=&s=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/399559679.jpg?k=4d88298c3e2495748558ebd7039459f2c77e9a3709a81266c2784ab61eca4cb1&o=&hp=1',
  ];
  function getLocation() {
    if (item.location == undefined ) {
      return ""
    }
    return item.location.address + ", " + item.location.city + ", " + item.location.country
  }

  function getImages() {
    if (item.image_urls == undefined ) {
      return []
    }
    return item.image_urls
  }

  function getFeatures() {
    if (item.features == undefined ) {
      return []
    }
    return item.features
  }
  
  return (
    <Card
      style={{ width: 400 }}
      cover={<AccommodationImages images={getImages()} />}
    >
      <Meta
        title={<AccommodationHeader title={item.name} rating={4.3869} />}
        description={getLocation()}
      />
      <Divider orientation="left" orientationMargin="0">
        Guests
      </Divider>
      <b>Minimum:</b> {item.min_guests}<br />
      <b>Maximum:</b> {item.max_guests}
      <Divider orientation="left" orientationMargin="0">
        Amenities
      </Divider>
      <div className={styles.amenities}>
        {
        getFeatures().map((feature) => (
          <AccommodationAmenity name={feature} />
        ))}
      </div>
      <Divider orientation="left" orientationMargin="0">
        Price
      </Divider>
      <b>Base Price:</b> {item.basePrice}<br />
      <b>Total Price:</b> {item.totalPrice}
      <Divider orientation="left" orientationMargin="0">
        Host
      </Divider>
      <Avatar src={<UserIcon type="male" size={0} />} /> Mr. Host
      {role === 'guest' && (
        <>
          <Button
            type="primary"
            text="Reserve"
            style={{ width: '100%', marginTop: '2rem' }}
          />
        </>
      )}
    </Card>
  );
};

export default AccommodationCard;
