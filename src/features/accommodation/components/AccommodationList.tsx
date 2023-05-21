import { SearchAccommodation } from '@/features/search/types/SearchAccommodation';
import { Col, Empty, Row, Space } from 'antd';
import styles from '../styles/accommodation.module.scss';
import AccommodationCard from './AccommodationCard/AccommodationCard';

interface AccommodationListProps {
  accommodations?: SearchAccommodation[];
  days?: number;
  extended?: boolean;
}

const AccommodationList = ({
  accommodations,
  days,
  extended,
}: AccommodationListProps) => {
  return (
    <div>
      <Space className={styles.centerContainer}>
        <Row gutter={[16, 24]} justify="start">
          {accommodations?.map((item) => (
            <Col key={item.id}>
              <AccommodationCard
                item={item}
                extended={extended}
                days={days}
                price={item.basePrice}
              />
            </Col>
          ))}
          {accommodations !== undefined && accommodations.length === 0 && (
            <Empty description={'Nothing found :('} />
          )}
        </Row>
      </Space>
    </div>
  );
};

export default AccommodationList;
