/* eslint-disable camelcase */
/* eslint-disable indent */
import { selectAuthState, selectRole } from '@/common/store/slices/authSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  cancelReservation,
  getActiveByGuest,
} from '../services/reservation.service';

import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { Accommodation } from '@/common/types/Accommodation';
import { getById } from '@/features/accommodation/services/accommodation.service';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import styles from '../styles/reservation.module.scss';
import { ReservationDto } from '../types/ReservationDto';

const GuestHistory = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const authState = useSelector(selectAuthState);
  const userRole = useSelector(selectRole);
  const [reservations, setReservations] = useState<ReservationDto[]>([]);
  const [accommodations, setAccommodations] = useState(new Map());
  const [needsUpdate, setNeedsUpdate] = useState(false);
  useEffect(() => {
    if (authState === null) {
      console.log('waiting...');
    } else if (!authState || userRole !== 'guest') {
      router.push('/');
    } else {
      getActiveByGuest()
        .then((response) => {
          const items = response.data.items as ReservationDto[];
          setReservations(items);
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const accommodationId = item.accommodation.id;
            getById(accommodationId)
              .then((response) => {
                setNeedsUpdate(false);
                setAccommodations(
                  accommodations.set(accommodationId, response.data)
                );
                if (i === items.length - 1) {
                  setLoading(false);
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [authState, userRole, needsUpdate]);

  const handleCancel = async (id: string) => {
    await cancelReservation(id)
      .then((response) => setNeedsUpdate(true))
      .catch((error) => console.log(error));
  };

  const columns = [
    {
      title: 'Accommodation',
      dataIndex: 'accommodation',
      key: 'accommodation',
      render: (accommodation: Accommodation) => {
        console.log(accommodations);
        console.log(accommodation.id);
        const accommodation2 = accommodations.get(
          accommodation.id
        ) as Accommodation;
        console.log(accommodation2);
        return <b>{accommodation2 ? accommodation2.name : ''}</b>;
      },
    },
    {
      title: 'Check-in',
      dataIndex: 'beginning_date',
      key: 'beginning_date',
      render: (beginning_date: string) => {
        return dayjs(beginning_date).format('dddd, MMMM DD, YYYY');
      },
      defaultSortOrder: 'descend',
      sorter: (a, b) =>
        dayjs(a.ending_date).toDate().valueOf() -
        dayjs(b.ending_date).toDate().valueOf(),
    },
    {
      title: 'Check-out-date',
      dataIndex: 'ending_date',
      key: 'ending_date',
      render: (ending_date: string) => {
        return dayjs(ending_date).format('dddd, MMMM DD, YYYY');
      },
      sorter: (a, b) =>
        dayjs(a.ending_date).toDate().valueOf() -
        dayjs(b.ending_date).toDate().valueOf(),
    },
    {
      title: 'Guests',
      dataIndex: 'number_of_guests',
      key: 'number_of_guests',
      sorter: (a, b) => a.number_of_guests - b.number_of_guests,
    },
    {
      title: 'Total price',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (total_price: number) => <>€{total_price}</>,
      sorter: (a, b) => a.total_price - b.total_price,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        let formatted;
        let color;
        switch (status) {
          case 1:
            formatted = 'DENIED';
            color = 'red';
            break;
          case 2:
            formatted = 'PENDING';
            color = 'yellow';
            break;
          case 3:
            formatted = 'ACCEPTED';
            color = 'green';
            break;
          default:
            formatted = '';
            color = '';
        }

        return (
          <Tag key={status} color={color}>
            {formatted}
          </Tag>
        );
      },
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: '',
      dataIndex: '',
      key: 'cancel',
      render: (a, b) => {
        const isCancellable =
          dayjs().endOf('day') < dayjs(a.beginning_date).endOf('day');
        return (
          isCancellable && (
            <Button
              action={() => handleCancel(a.reservation_id)}
              style={{ color: '#f04668' }}
              type="transparent"
              text="Cancel"
            />
          )
        );
      },
    },
  ];

  return loading ? (
    <Loading />
  ) : (
    <Table
      className={styles.table}
      dataSource={reservations}
      columns={columns}
      pagination={{ position: ['bottomCenter'] }}
    ></Table>
  );
};

export default GuestHistory;
