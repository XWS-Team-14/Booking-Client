import Loading from '@/common/components/loading/Loading';
import { selectAuthState, selectId, selectRole } from '@/common/store/slices/authSlice';
import { SearchAccommodation } from '@/features/search/types/SearchAccommodation';
import { Divider, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRecomended } from '../services/accommodation.service';
import styles from '../styles/accommodation.module.scss';
import AccommodationList from './AccommodationList';

const RecommendedAccommodations = () => {
  const [recommended, setRecommended] = useState<SearchAccommodation[]>([]);
  const [loading, setLoading] = useState(true); //should initially be true
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const role = useSelector(selectRole);
  const currentUserId = useSelector(selectId);
  useEffect(() => {
    if (authState === null) {
      console.log('waiting...');
    } else if (authState && role === 'guest') {
      getRecomended(currentUserId)
        .then((response) => {
          if (response.data === 'Error: None found'){
            console.log('Error: None found');
            setLoading(false);
          }
          else{
            setRecommended(response.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data === 'Error: None found'){
            console.log('Error: None found');
            setLoading(false);
          }
        });
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
