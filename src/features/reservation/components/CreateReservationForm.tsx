import Button from '@/common/components/button/Button';
import { selectRole } from '@/common/store/slices/authSlice';
import { Accommodation } from '@/common/types/Accommodation';
import { Availability } from '@/common/types/Availability';
import {
  calculateDays,
  isAccommodationReservable,
} from '@/common/utils/dateHelper';
import AccommodationPrice from '@/features/accommodation/components/AccommodationPrice';
import { getPrice } from '@/features/availability/services/availability.service';
import { PriceLookupDto } from '@/features/availability/types/PriceLookupDto';
import { DatePicker, InputNumber } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/reservation.module.scss';
import { CreateReservationDto } from '../types/ReservationDto';
import { createReservation } from '../services/reservation.service';

interface CreateReservationFormProps {
  accommodation: Accommodation;
  availability: Availability;
}

const CreateReservationForm = ({
  accommodation,
  availability,
}: CreateReservationFormProps) => {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState<number>(1);
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);
  const [price, setPrice] = useState<number>();
  const userRole = useSelector(selectRole);

  useEffect(() => {
    const getData = setTimeout(async () => {
      const dto: PriceLookupDto = {
        interval: {
          date_start: dayjs(checkInDate).format('YYYY-MM-DD').toString(),
          date_end: dayjs(checkOutDate).format('YYYY-MM-DD').toString(),
        },
        guests: guestCount,
        accommodation_id: accommodation?.id ? accommodation.id : '',
      };
      await getPrice(dto)
        .then((response) => {
          setPrice(response.data.price);
          setLoadingPrice(false);
        })
        .catch((error) => console.log(error));
    }, 1000);

    return () => clearTimeout(getData);
  }, [checkInDate, checkOutDate, guestCount]);

  const dates = (current: Dayjs) =>
    isAccommodationReservable(
      current,
      dayjs(availability?.interval.date_start),
      dayjs(availability?.interval.date_end)
    );

  const handleFinish = async () => {
    const dto: CreateReservationDto = {
      accommodation_id: accommodation.id,
      host_id: accommodation.host_id,
      number_of_guests: guestCount,
      beginning_date: dayjs(checkInDate).format('YYYY-MM-DD'),
      ending_date: dayjs(checkOutDate).format('YYYY-MM-DD'),
      total_price: price ? price : 0,
    };
    console.log(dto);
    await createReservation(dto)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  const changeDate: RangePickerProps['onChange'] = (date, value) => {
    setLoadingPrice(true);
    if (date) {
      setCheckInDate(date[0]?.toDate());
      setCheckOutDate(date[1]?.toDate());
    } else {
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
    }
  };

  const changeGuestCount = (value: number | null) => {
    setLoadingPrice(true);
    setGuestCount(value);
  };

  return (
    <div className={classNames(styles.reserveSection, 'frostedGlass')}>
      <AccommodationPrice
        loading={loadingPrice}
        days={
          checkInDate && checkOutDate
            ? calculateDays(dayjs(checkInDate), dayjs(checkOutDate))
            : 1
        }
        price={price ? price : availability?.base_price}
      />
      <DatePicker.RangePicker
        format="dddd, MMMM DD, YYYY"
        allowClear
        placeholder={['Check-in date', 'Checkout date']}
        disabledDate={dates}
        style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '1rem',
          height: '54.4px',
        }}
        onChange={(event) => changeDate(event)}
      />
      <InputNumber
        min={accommodation?.min_guests}
        max={accommodation?.max_guests}
        placeholder={`Number of guests (${accommodation?.min_guests}–${accommodation?.max_guests})`}
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '0.7rem 0.4rem',
          borderRadius: '1rem',
          height: '54.4px',
        }}
        onChange={(event) => {
          changeGuestCount(event);
        }}
      />
      {userRole === 'guest' && (
        <Button
          type="primary"
          text="Reserve"
          style={{ minHeight: '2.5rem', fontSize: '14px' }}
          action={handleFinish}
        />
      )}
    </div>
  );
};

export default CreateReservationForm;
