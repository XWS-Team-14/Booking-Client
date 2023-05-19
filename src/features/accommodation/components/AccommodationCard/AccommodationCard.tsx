import { Avatar, Card, Divider } from 'antd';

import { SearchAccommodation } from '@/features/search/types/SearchAccommodation';
import UserIcon from '@/features/user/components/icon/UserIcon';
import { useRouter } from 'next/router';
import { AccommodationAmenity } from './AccommodationAmenity';
import styles from './AccommodationCard.module.scss';
import { AccommodationHeader } from './AccommodationHeader';
import { AccommodationImages } from './AccommodationImages';

const { Meta } = Card;

interface AccommodationCardProps {
  item: SearchAccommodation;
  extended?: boolean;
}
const AccommodationCard = ({ item, extended }: AccommodationCardProps) => {
  const router = useRouter();

  const getLocation = () =>
    item.location
      ? `${item.location.address}, ${item.location.city}, ${item.location.country}`
      : '';

  const getImages = () => (item.imageUrls ? item.imageUrls : []);

  const getFeatures = () => (item.features ? item.features : []);

  return (
    <Card
      style={{ width: 400, cursor: 'pointer' }}
      cover={<AccommodationImages images={getImages()} />}
      onClick={() => router.push(`/accommodations/${item.accommodationId}`)}
    >
      <Meta
        title={<AccommodationHeader title={item.name} rating={4.3869} />}
        description={getLocation()}
      />
      {extended && (
        <>
          <Divider orientation="left" orientationMargin="0">
            Guests
          </Divider>
          {item.minGuests} - {item.maxGuests}
        </>
      )}
      {extended && (
        <>
          <Divider orientation="left" orientationMargin="0">
            Amenities
          </Divider>
          <div className={styles.amenities}>
            {getFeatures().map((feature) => (
              <AccommodationAmenity key={feature} name={feature} />
            ))}
          </div>
        </>
      )}
      {extended && (
        <>
          <Divider orientation="left" orientationMargin="0">
            Price
          </Divider>
          <b>Base Price:</b> {item.basePrice}€, <b>Total Price:</b>{' '}
          {item.totalPrice}€
        </>
      )}
      {extended && (
        <>
          <Divider orientation="left" orientationMargin="0">
            Host
          </Divider>
          <Avatar src={<UserIcon type="male" size={0} />} /> Mr. Host
        </>
      )}
    </Card>
  );
};

export default AccommodationCard;
