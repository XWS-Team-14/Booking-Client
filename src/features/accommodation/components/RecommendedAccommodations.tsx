import Loading from '@/common/components/loading/Loading';
import { selectAuthState, selectRole } from '@/common/store/slices/authSlice';
import { SearchAccommodation } from '@/features/search/types/SearchAccommodation';
import { Divider, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAll } from '../services/accommodation.service';
import styles from '../styles/accommodation.module.scss';
import AccommodationList from './AccommodationList';

const RecommendedAccommodations = () => {
  const [recommended, setRecommended] = useState<SearchAccommodation[]>([]);
  const [loading, setLoading] = useState(false); //should initially be true
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (authState === null) {
      console.log('waiting...');
    } else if (authState && role === 'guest') {
      //fetch recommended accommodations and set loading to false
      //get all is just a demo
      getAll()
        .then((response) => setRecommended(response.data.items))
        .catch((err) => console.log(err));
    } else {
      router.push('/');
    }
  }, [role, authState]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className={styles.centerText}>
        <Title level={2}>Recommended for you</Title>
        <Typography.Text>
          Here are the top recommended stays for you, based on your previous
          activity.
        </Typography.Text>
      </div>
      <Divider />
      <AccommodationList accommodations={recommended} />
    </div>
  );
};

export default RecommendedAccommodations;
