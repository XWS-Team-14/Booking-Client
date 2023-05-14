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
import { SearchAccommodation } from '@/features/search/types/SearchAccommodation';

const AccommodationCard = (item: SearchAccommodation) => {
  const role = useSelector(selectRole);
  function getLocation() {
    if (item.location == undefined ) {
      return ""
    }
    return item.location.address + ", " + item.location.city + ", " + item.location.country
  }

  function getImages() {
    console.log(item)
    if (item.imageUrls == undefined ) {
      return []
    }
    return item.imageUrls
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
      <b>Minimum:</b> {item.minGuests}<br />
      <b>Maximum:</b> {item.maxGuests}
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
