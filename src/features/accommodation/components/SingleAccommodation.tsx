import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectRole } from '@/common/store/slices/authSlice';
import { Accommodation } from '@/common/types/Accommodation';
import { Availability } from '@/common/types/Availability';
import { UserDetails } from '@/common/types/User';
import { isAccommodationReservable } from '@/common/utils/dateHelper';
import { getByAccommodationId } from '@/features/availability/services/availability.service';
import UserChip from '@/features/user/components/chip/UserChip';
import { getUserById } from '@/features/user/services/user.service';
import { EnvironmentTwoTone, StarTwoTone } from '@ant-design/icons';
import { DatePicker, Divider, InputNumber, Tag } from 'antd';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getById } from '../services/accommodation.service';
import styles from '../styles/accommodation.module.scss';
import { AccommodationImages } from './AccommodationCard/AccommodationImages';

interface SingleAccommodationProps {
  id: string;
}

const SingleAccommodation = ({ id }: SingleAccommodationProps) => {
  const [accommodation, setAccommodation] = useState<Accommodation>();
  const [availability, setAvailability] = useState<Availability>();
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState<number>(1);
  const [host, setHost] = useState<UserDetails>();
  const userRole = useSelector(selectRole);

  const calculateDays = () => {
    if (checkInDate && checkOutDate) {
      const date1 = dayjs(checkInDate);
      const date2 = dayjs(checkOutDate);
      return Math.abs(date1.diff(date2, 'days'));
    } else {
      return 1;
    }
  };

  const calculatePrice = () =>
    availability?.base_price ? availability?.base_price * guestCount : 0;

  const dates = (current: Dayjs) =>
    isAccommodationReservable(
      current,
      dayjs(availability?.interval.date_start),
      dayjs(availability?.interval.date_end)
    );

  useEffect(() => {
    getByAccommodationId(id).then((response) => {
      setAvailability(response.data);
    });
    getById(id)
      .then((response) => {
        setAccommodation(response.data);
        getUserById(response.data.user_id).then((host) => {
          setHost(host.data);
          setLoading(false);
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className={styles.singleWrapper}>
      <h1 className={styles.accommodation__title}>{accommodation?.name}</h1>
      <div className={styles.accommodation__sub}>
        <div className={styles.accommodation__address}>
          <EnvironmentTwoTone /> {accommodation?.location.address},{' '}
          {accommodation?.location.city}, {accommodation?.location.country}
        </div>
        •
        <div className={styles.accommodation__rating}>
          <StarTwoTone twoToneColor="#FFB900" /> 4.39 (8 reviews)
        </div>
      </div>
      <div className={styles.accommodation__carousel}>
        <AccommodationImages
          classname={styles.accommodation__carousel__images}
          images={accommodation?.image_urls ? accommodation.image_urls : []}
        />
      </div>

      <div className={styles.singleContent}>
        <div className={styles.infoWrapper}>
          <div className={styles.accommodation__host}>
            <Divider
              orientation="left"
              orientationMargin={0}
              style={{ fontSize: '20px', fontWeight: '600' }}
            >
              Your host
            </Divider>
            <div className={styles.accommodation__host__chip}>
              <UserChip
                name={`${host?.first_name} ${host?.last_name}`}
                size={50}
                gender={host.gender}
              />
            </div>
          </div>
          <div className={styles.accommodation__amenities}>
            <Divider
              orientation="left"
              orientationMargin={0}
              style={{ fontSize: '20px', fontWeight: '600' }}
            >
              Amenities
            </Divider>
            {accommodation?.features.map((feature) => (
              <Tag
                color="#71B7E3"
                style={{
                  fontSize: '14px',
                  padding: '0.3rem 1rem',
                  borderRadius: '2rem',
                  marginBottom: '1rem',
                }}
                bordered={false}
                key={feature}
              >
                {feature}
              </Tag>
            ))}
          </div>
        </div>
        <div className={classNames(styles.reserveSection, 'frostedGlass')}>
          <div className={styles.reserveSection__price}>
            €{calculatePrice()}
          </div>
          <span className={styles.reserveSection__description}>
            {availability?.pricing_type === 'Per_guest' ? (
              <>per person</>
            ) : (
              <>per unit</>
            )}{' '}
            for {calculateDays()}{' '}
            {calculateDays() > 1 ? <>nights</> : <>night</>}
          </span>
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
          />
          {userRole === 'guest' && (
            <Button
              type="primary"
              text="Reserve"
              style={{ minHeight: '2.5rem', fontSize: '14px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleAccommodation;
