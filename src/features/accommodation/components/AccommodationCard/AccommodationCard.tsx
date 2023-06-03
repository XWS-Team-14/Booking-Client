import { Card, Divider } from 'antd';

import Button from '@/common/components/button/Button';
import { SearchAccommodation } from '@/features/search/types/SearchAccommodation';
import { useRouter } from 'next/router';
import AccommodationPrice from '../AccommodationPrice';
import { AccommodationHeader } from './AccommodationHeader';
import { AccommodationImages } from './AccommodationImages';

const { Meta } = Card;

interface AccommodationCardProps {
  item: SearchAccommodation;
  extended?: boolean;
  days?: number;
}

const AccommodationCard = ({
  item,
  extended,
  days,
}: AccommodationCardProps) => {
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
      cover={
        <div onClick={() => router.push(`/accommodations/${item.id}`)}>
          <AccommodationImages images={getImages()} />
        </div>
      }
    >
      <div onClick={() => router.push(`/accommodations/${item.id}`)}>
        <Meta
          title={<AccommodationHeader title={item.name} rating={4.3869} />}
          description={getLocation()}
        />
      </div>
      {item.totalPrice && (
        <div
          style={{ marginTop: '1rem' }}
          onClick={() => router.push(`/accommodations/${item.id}`)}
        >
          <AccommodationPrice
            price={item.totalPrice}
            days={days === 0 || isNaN(days) ? 1 : days}
          />
        </div>
      )}
      {extended && !item.autoAcceptenceFlag && (
        <>
          <Divider />
          <Button
            type="transparent"
            style={{ fontSize: '14px' }}
            text="See reservations"
            action={() => router.push(`/reservations/${item.id}`)}
          ></Button>
        </>
      )}
    </Card>
  );
};

export default AccommodationCard;
