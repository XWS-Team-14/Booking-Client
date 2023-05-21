import { SearchAccommodation } from '@/features/search/types/SearchAccommodation';
import { Col, Row, Space } from 'antd';
import styles from '../styles/accommodation.module.scss';
import AccommodationCard from './AccommodationCard/AccommodationCard';

interface AccommodationListProps {
  accommodations?: SearchAccommodation[];
  days?: number;
}

const AccommodationList = ({
  accommodations,
  days,
}: AccommodationListProps) => {
  return (
    <div>
      <Space className={styles.centerContainer}>
        <Row gutter={[16, 24]} justify="start">
          {accommodations?.map((item) => (
            <Col key={item.id}>
              <AccommodationCard
                item={item}
                extended={false}
                days={days}
                price={item.basePrice}
              />
            </Col>
          ))}
          {accommodations !== undefined && accommodations.length === 0 && (
            <p>Nothing found :(</p>
          )}
        </Row>
      </Space>
    </div>
  );
};

export default AccommodationList;
