import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectId, selectRole } from '@/common/store/slices/authSlice';
import { Accommodation } from '@/common/types/Accommodation';
import { Availability } from '@/common/types/Availability';
import { UserDetails } from '@/common/types/User';
import {
  calculateDays,
  isAccommodationReservable,
  isDateBeforeToday,
} from '@/common/utils/dateHelper';
import { getRoundedRating } from '@/common/utils/getRoundedRating';
import { getByAccommodationId } from '@/features/availability/services/availability.service';
import { isSpecialPricingOn } from '@/features/availability/utils/isSpecialPricingOn';
import UserChip from '@/features/user/components/chip/UserChip';
import { getUserById } from '@/features/user/services/user.service';
import { EnvironmentTwoTone, StarTwoTone } from '@ant-design/icons';
import {
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Select,
  Switch,
  Tag,
} from 'antd';
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
  const currentUserId = useSelector(selectId);
  const [host, setHost] = useState<UserDetails>();
  const userRole = useSelector(selectRole);
  const calculatePrice = () =>
    availability?.base_price ? availability?.base_price * guestCount : 0;
  const [currentIsHost, setCurrentIsHost] = useState(false);
  const [editable, setEditable] = useState(true);
  const { Option } = Select;

  const dates = (current: Dayjs) =>
    isAccommodationReservable(
      current,
      dayjs(availability?.interval.date_start),
      dayjs(availability?.interval.date_end)
    );

  const changeDate: RangePickerProps['onChange'] = (date, value) => {
    setCheckInDate(date[0]?.toDate());
    setCheckOutDate(date[1]?.toDate());
  };

  const changeGuestCount = (value: number | null) => {
    setGuestCount(value);
  };

  useEffect(() => {
    getByAccommodationId(id).then((response) => {
      setAvailability(response.data);
      console.log(response.data);
    });
    getById(id)
      .then((response) => {
        setAccommodation(response.data);
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

  useEffect(() => {
    isSpecialPricingOn('Weekend', availability);
  }, [availability]);

  console.log(isSpecialPricingOn('Holiday', availability));
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
          <AccommodationPrice days={calculateDays()} price={calculatePrice()} />
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
          {editable ? (
            <Form>
              <Form.Item hasFeedback name="dates">
                <DatePicker.RangePicker
                  format="dddd, MMMM DD, YYYY"
                  allowClear
                  defaultValue={[
                    dayjs(availability?.interval.date_start),
                    dayjs(availability?.interval.date_end),
                  ]}
                  disabledDate={isDateBeforeToday}
                />
              </Form.Item>
              <Form.Item hasFeedback name="basePrice">
                <InputNumber
                  defaultValue={availability?.base_price}
                  prefix="€"
                  placeholder="Base price"
                  style={{
                    width: '100%',
                  }}
                ></InputNumber>
              </Form.Item>
              <Form.Item
                hasFeedback
                name="pricingStrategy"
                rules={[{ required: true, message: 'Gender is required.' }]}
              >
                <Select
                  placeholder="Pricing strategy"
                  defaultValue={
                    availability?.pricing_type === 'Per_guest'
                      ? 'Per guest'
                      : 'Per unit'
                  }
                >
                  <Option value="Per_accommodation_unit">Per unit</Option>
                  <Option value="Per_guest">Per guest</Option>
                </Select>
              </Form.Item>

              <div className={styles.multipliers}>
                Weekend multiplier{' '}
                <Switch
                  defaultChecked={isSpecialPricingOn('Weekend', availability)}
                ></Switch>
              </div>
              {isSpecialPricingOn('Weekend', availability) && (
                <Form.Item>
                  <InputNumber
                    defaultValue={
                      availability?.special_pricing?.at(0)?.pricing_markup
                    }
                    style={{
                      width: '100%',
                    }}
                  ></InputNumber>
                </Form.Item>
              )}
              <div className={styles.multipliers}>
                Holiday multiplier{' '}
                <Switch
                  defaultChecked={isSpecialPricingOn('Holiday', availability)}
                ></Switch>
              </div>
              {isSpecialPricingOn('Holiday', availability) && (
                <Form.Item>
                  <InputNumber
                    defaultValue={
                      availability?.special_pricing?.at(1)?.pricing_markup
                    }
                    style={{
                      width: '100%',
                    }}
                  ></InputNumber>
                </Form.Item>
              )}
            </Form>
          ) : (
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
        </>
      )}
    </div>
  );
};

export default SingleAccommodation;
