import Button from '@/common/components/button/Button';
import { useRouter } from 'next/dist/client/router';
import { ToastContainer } from 'react-toastify';

import { selectUser } from '@/common/store/slices/authSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/accommodation.module.scss';

import Loading from '@/common/components/loading/Loading';
import { getAccommodations } from '../services/reservation.service';

const Accommodations = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  useEffect(() => {
    if (user.email === null || user.role !== 'guest') {
      router.push('/');
    } else {
      setLoading(false);
      getAccommodations().then((res) => {
        setAccommodations(res);
      });
    }
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <section className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Accommodations</h1>
        <div className={styles.reservationCard}>
          {accommodations.length > 0 ? (
            accommodations.map((accommodation, index) => (
              <div className={styles.reservationCardContent} key={index}>
                <b>{accommodation.name}</b>
                <b>{accommodation.maxGuests.toString()}</b>
                <b>{accommodation.minGuests}</b>
                <Button
                  type="primary"
                  action={() => {
                    router.push(
                      `/?accommodationId=${accommodation.Id}/reserve`
                    );
                  }}
                  style={{ width: '100%' }}
                  text="Make Reservation"
                />
              </div>
            ))
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Accommodations;
