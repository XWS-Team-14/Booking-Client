import Loading from '@/common/components/loading/Loading';
import { calculateDays } from '@/common/utils/dateHelper';
import AccommodationList from '@/features/accommodation/components/AccommodationList';
import dayjs from 'dayjs';
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
  const [accommodations, setAccommodations] = useState<SearchResultDto>();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetchData(searchParams).then((data) => {
      setAccommodations(data);
      setFetched(true);
    });
  }, [searchParams]);

  return fetched ? (
    <div className={styles.searchBarContainer}>
      <ToastContainer />
      <AccommodationList
        accommodations={
          !!accommodations?.items === false ? [] : accommodations?.items
        }
        days={calculateDays(
          dayjs(searchParams?.start_date),
          dayjs(searchParams?.end_date)
        )}
      />
    </div>
  ) : (
    <Loading />
  );
};

export default SearchData;
