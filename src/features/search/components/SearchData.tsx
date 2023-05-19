import Loading from '@/common/components/loading/Loading';
import AccommodationInfo from '@/features/accommodation/components/AccommodationCard/AccommodationCard';
import { Col, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from '../service/search.service';
import styles from '../styles/search.module.scss';
import { SearchParams } from '../types/SearchParams';
import { SearchResultDto } from '../types/SearchResultDto';
interface SearchDataProps {
  searchParams: SearchParams | undefined;
}

const SearchData = ({ searchParams }: SearchDataProps) => {
  const [accommodations, setAccommodations] = useState<SearchResultDto>(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    setFetched(true);
    fetchData(searchParams).then((data) => {
      setAccommodations(data);
      setFetched(true);
    });
  }, [searchParams]);

  return fetched ? (
    <div className={styles.searchBarContainer}>
      <ToastContainer />
      <Space className={styles.centerContainer}>
        <Row gutter={[16, 24]} justify="start">
          {accommodations?.items?.map((item) => (
            <Col key={item.accommodationId}>
              <AccommodationInfo item={item} extended={false} />
            </Col>
          ))}
          {!!accommodations?.items === false && fetched && (
            <p>Nothing found :(</p>
          )}
        </Row>
      </Space>
    </div>
  ) : (
    <Loading />
  );
};

export default SearchData;
