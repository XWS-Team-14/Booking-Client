/* eslint-disable no-nested-ternary */
import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectId, selectRole } from '@/common/store/slices/authSlice';
import { Accommodation } from '@/common/types/Accommodation';
import { Availability } from '@/common/types/Availability';
import { UserDetails } from '@/common/types/User';
import { checkIfEmptyObjectOrFalsy } from '@/common/utils/checkIfEmptyObjectOrFalsy';
import {
  calculateDays,
  isAccommodationReservable,
} from '@/common/utils/dateHelper';
import { getRoundedRating } from '@/common/utils/getRoundedRating';
import AvailabilityForm from '@/features/availability/components/AvailabilityForm';
import {
  getByAccommodationId,
  getPrice,
} from '@/features/availability/services/availability.service';
import { PriceLookupDto } from '@/features/availability/types/PriceLookupDto';
import UserChip from '@/features/user/components/chip/UserChip';
import { getUserById } from '@/features/user/services/user.service';
import { EnvironmentTwoTone, StarTwoTone } from '@ant-design/icons';
import { DatePicker, Divider, InputNumber, Select, Tag } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getById } from '../services/accommodation.service';
import styles from '../styles/accommodation.module.scss';
import { AccommodationImages } from './AccommodationCard/AccommodationImages';
import AccommodationPrice from './AccommodationPrice';
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
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);
  const currentUserId = useSelector(selectId);
  const [host, setHost] = useState<UserDetails>();
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

  const [currentIsHost, setCurrentIsHost] = useState(false);
  const [editable, setEditable] = useState(false);
  const { Option } = Select;

  const dates = (current: Dayjs) =>
    isAccommodationReservable(
      current,
      dayjs(availability?.interval.date_start),
      dayjs(availability?.interval.date_end)
    );

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

  useEffect(() => {
    getByAccommodationId(id).then((response) => {
      setAvailability(response.data);
    });
    getById(id)
      .then((response) => {
        setAccommodation(response.data);
        console.log(response.data);
        const hostId = response.data.user_id
          ? response.data.user_id
          : response.data.userId;
        if (hostId === currentUserId) {
          setCurrentIsHost(true);
        }
        getUserById(hostId).then((host) => {
          setHost(host.data);
          setLoading(false);
        });
      })
      .catch((error) => console.log(error));
  }, [currentUserId, id]);

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
          <StarTwoTone twoToneColor="#FFB900" /> {getRoundedRating(4.389)} (8
          reviews)
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
              Host
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
            />
          )}
        </div>
      </div>
      {currentIsHost && (
        <>
          <Divider
            orientation="left"
            orientationMargin={0}
            style={{ fontSize: '20px', fontWeight: '600' }}
          >
            Availability and price settings
          </Divider>
          {!editable && checkIfEmptyObjectOrFalsy(availability) && (
            <>
              You have not set the price and availability of this accommodation
              yet.
              <Button
                type="secondary"
                text="Set now"
                style={{ marginTop: '1rem' }}
                action={() => setEditable(true)}
              />
            </>
          )}
          {editable && checkIfEmptyObjectOrFalsy(availability) && (
            <AvailabilityForm
              accommodationId={accommodation?.id}
              cancelAction={() => setEditable(false)}
            />
          )}
          {!editable && !checkIfEmptyObjectOrFalsy(availability) && (
            <div className={styles.infoWrapper}>
              <p>
                This accommodation is available from{' '}
                <b>
                  {dayjs(availability?.interval.date_start).format(
                    'dddd, MMMM DD, YYYY'
                  )}
                </b>{' '}
                to{' '}
                <b>
                  {dayjs(availability?.interval.date_end).format(
                    'dddd, MMMM DD, YYYY'
                  )}
                </b>
                .<br />
                Current base price is <b>€{availability?.base_price}</b> for one
                night{' '}
                <b>
                  {availability?.pricing_type === 'Per_guest' ? (
                    <>per guest</>
                  ) : (
                    <>for the whole unit</>
                  )}
                </b>
                .
              </p>
              <Button
                type="secondary"
                text="Edit"
                action={() => setEditable(true)}
              />
            </div>
          )}
          {editable && !checkIfEmptyObjectOrFalsy(availability) && (
            <AvailabilityForm
              availability={availability}
              accommodationId={accommodation?.id}
              cancelAction={() => setEditable(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SingleAccommodation;
