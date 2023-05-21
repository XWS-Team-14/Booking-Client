import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectAuthState, selectRole } from '@/common/store/slices/authSlice';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccomodationsByUser } from '../services/accommodation.service';
import styles from '../styles/accommodation.module.scss';
import AccommodationList from './AccommodationList';

const HostsAccommodations = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [accommodations, setAccommodations] = useState();
  const authState = useSelector(selectAuthState);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (authState === null) {
      console.log('waiting...');
    } else if (authState && role === 'host') {
      getAccomodationsByUser().then((response) => {
        setAccommodations(response.data.items);
        setLoading(false);
      });
    } else {
      router.push('/');
    }
  }, [role, authState]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={classNames(styles.wrapper, styles.marginTop)}>
        <Button
          type="primary"
          text="Add a new accommodation"
          style={{ marginBottom: '2rem' }}
          action={() => router.push('/accommodations/create')}
        />
        <AccommodationList accommodations={accommodations} extended={true} />
      </div>
    </>
  );
};

export default HostsAccommodations;
