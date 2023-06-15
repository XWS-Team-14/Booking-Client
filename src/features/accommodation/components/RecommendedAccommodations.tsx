import Loading from '@/common/components/loading/Loading';
import { selectAuthState, selectRole } from '@/common/store/slices/authSlice';
import { SearchAccommodation } from '@/features/search/types/SearchAccommodation';
import { Divider, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
      //fetch reccommended accommodations and set loading to false
    } else {
      router.push('/');
    }
  }, [role, authState]);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.leftAligned}>
      <Paragraph>
        <Title level={2}>Recommended for you</Title>
        <Typography.Text>
          Here are the top recommended stays for you, based on your previous
          activity.
        </Typography.Text>
      </Paragraph>
      <Divider />
      <AccommodationList accommodations={recommended} />
    </div>
  );
};

export default RecommendedAccommodations;
