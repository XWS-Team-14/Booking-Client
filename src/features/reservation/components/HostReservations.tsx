import Loading from '@/common/components/loading/Loading';
import { selectUser } from '@/common/store/slices/authSlice';
import { Button, Menu, MenuProps, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  acceptReservation,
  getByAccommodation,
  getByHost,
  getUserById,
} from '../services/reservation.service';
import styles from '../styles/reservation.module.scss';
import ReservationDto from '../types/ReservationDto';

const HostReservations = () => {
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [reservations, setReservations] = useState<ReservationDto[]>([]);
  const user = useSelector(selectUser);
  const { confirm } = Modal;
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [guests, setGuests] = useState<any[]>([]);

  useEffect(() => {
    setLoading(false);
    Promise.all([
      getByHost(),
      Promise.all(
        reservations.map((reservation) => getUserById(reservation.guest.id))
      ),
    ])
      .then(([reservations, guests]) => {
        setReservations(reservations);
        setGuests(guests);
      })
      .then()
      .catch((error) => {
        console.error('Error fetching reservations and guests:', error);
      });
  }, [user]);
  //add a function call that gets all accommodations  by host

  const setReservationsByAccommodation: MenuProps['onClick'] = (e) => {
    getByAccommodation(e.key).then((reservations) => {
      setReservations(reservations);
    });
  };

  const showConfirm = (reservation: ReservationDto) => {
    confirm({
      content: <p>Are you sure you want to accept this reservation?</p>,
      onOk() {
        acceptReservation(reservation);
      },
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <section className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Reservation Requests</h1>
        <Menu>
          {accommodations.map((accommodation) => (
            <Menu.Item
              key={accommodation.id}
              onClick={setReservationsByAccommodation}
            >
              {accommodation.name}
            </Menu.Item>
          ))}
        </Menu>
        <div className={styles.reservationCard}>
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <div className={styles.reservationCardContent} key={index}>
                <b>
                  {guests[index]?.name} {guests[index]?.lastname}
                </b>
                <b>{reservation.beginning_date.toString()}</b>
                <b>{reservation.ending_date.toString()}</b>
                <b>{reservation.number_of_guests}</b>
                <b>{reservation.total_price}</b>
                <Button
                  type="primary"
                  onClick={() => {
                    showConfirm(reservation);
                  }}
                  style={{ width: '100%' }}
                >
                  Accept Reservation
                </Button>
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
export default HostReservations;
