import Button from '@/common/components/button/Button';
import {
  HomeOutlined,
  IdcardOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Checkbox, DatePicker, Form, Input, InputNumber, Modal, Upload } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { ToastContainer, toast } from 'react-toastify';

import { selectUser } from '@/common/store/slices/authSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/accommodation.module.scss';

import { create } from '../services/accommodation.service';
import AccommodationFormDto from '../types/AccommodationFormDto';
import api from '@/common/utils/axiosInstance';
import { UploadFile } from 'antd/es/upload';
import Loading from '@/common/components/loading/Loading';
import AccommodationDto from '@/features/availability/types/accommodationDto';
import { GetAccommodations, GetGuest } from '../services/reservation.service';
import ReservationDto from '../types/ReservationDto';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const createReservation = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [accommodations, setAccommodations] = useState<AccommodationDto[]>([]);
  const [ confirm, setVisible] = useState(false);
  const [content, setContent] = useState('');
  useEffect(() => {
    if (user.email === null || user.role != 'guest') {
      router.push('/');
    } else {
      setLoading(false)
      GetAccommodations().then((res) =>{
        setAccommodations(res);
      })
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
                   
                  }}
                  style={{ width: '100%' }}
                  text='Make Reservation'
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

export default createReservation;
