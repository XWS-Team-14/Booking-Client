/* eslint-disable indent */
import Loading from '@/common/components/loading/Loading';
import {
  selectAuthState,
  selectId,
  selectRole,
} from '@/common/store/slices/authSlice';
import { Accommodation } from '@/common/types/Accommodation';
import { getById } from '@/features/accommodation/services/accommodation.service';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  acceptReservation,
  getByAccommodation,
} from '../services/reservation.service';
import styles from '../styles/reservation.module.scss';
import { ReservationDto, ReservationStatusDto } from '../types/ReservationDto';
interface PendingReservationsProps {
  accommodationId: string;
}

const PendingReservations = ({ accommodationId }: PendingReservationsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const authState = useSelector(selectAuthState);
  const userRole = useSelector(selectRole);
  const userId = useSelector(selectId);
  const [currentIsHost, setCurrentIsHost] = useState(false);
  const [reservations, setReservations] = useState<ReservationDto[]>([]);
  const [accommodation, setAccommodation] = useState();
  const [needsUpdate, setNeedsUpdate] = useState(true);

  const handleStatusUpdate = async (
    id: string,
    status: 'accepted' | 'rejected'
  ) => {
    const dto = {
      status: status,
    } as ReservationStatusDto;
    acceptReservation(id, dto)
      .then((response) => {
        console.log(response);
        setNeedsUpdate(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (authState === null) {
      console.log('..waiting');
    } else if (!authState || userRole !== 'host') {
      router.push('/');
    } else {
      getById(accommodationId)
        .then((response) => {
          const item = response.data as Accommodation;
          setAccommodation(response.data);
          if (item.user_id === userId) {
            setCurrentIsHost(true);
          } else {
            router.push('/');
          }
        })
        .catch((error) => console.log(error));
      getByAccommodation(accommodationId)
        .then((response) => {
          setReservations(response.data.items);
          setLoading(false);
          setNeedsUpdate(false);
        })
        .catch((error) => console.log(error));
    }
  }, [authState, userRole, needsUpdate]);

  const columns = [
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
            formatted = 'REJECTED';
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
  ];

  if (accommodation && accommodation.auto_accept_flag === 'false') {
    columns.push({
      title: 'Manage',
      dataIndex: '',
      key: 'manage',
      render: (a, b) => {
        const isManageable =
          dayjs().endOf('day') < dayjs(a.beginning_date).endOf('day') &&
          a.status === 2;
        return (
          isManageable && (
            <div className={styles.manageButtons}>
              <Button
                type="primary"
                shape="circle"
                size="small"
                style={{ backgroundColor: '#7dd957' }}
                onClick={() => handleStatusUpdate(a.reservation_id, 'accepted')}
                icon={<CheckOutlined style={{ fontSize: '12px' }} />}
              />
              <Button
                type="primary"
                shape="circle"
                size="small"
                style={{ backgroundColor: '#ed6681' }}
                onClick={() => handleStatusUpdate(a.reservation_id, 'rejected')}
                icon={<CloseOutlined style={{ fontSize: '12px' }} />}
              />
            </div>
          )
        );
      },
    });
  }

  return loading || !currentIsHost ? (
    <Loading />
  ) : (
    <Table
      className={styles.table}
      dataSource={reservations}
      columns={columns}
      pagination={{ position: ['bottomCenter'] }}
      locale={{ emptyText: 'No reservations yet.' }}
    ></Table>
  );
};

export default PendingReservations;
