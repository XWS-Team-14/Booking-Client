/* eslint-disable no-nested-ternary */
import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import {
  selectId,
  selectRole,
  selectUser,
} from '@/common/store/slices/authSlice';
import {
  selectReviewUpdateState,
  setReviewUpdate,
} from '@/common/store/slices/updateSlice';
import { Accommodation } from '@/common/types/Accommodation';
import { Availability } from '@/common/types/Availability';
import { UserDetails } from '@/common/types/User';
import { checkIfEmptyObjectOrFalsy } from '@/common/utils/checkIfEmptyObjectOrFalsy';
import { isAccommodationReservable } from '@/common/utils/dateHelper';
import { getRoundedRating } from '@/common/utils/getRoundedRating';
import AvailabilityForm from '@/features/availability/components/AvailabilityForm';
import { getByAccommodationId } from '@/features/availability/services/availability.service';
import CreateReservationForm from '@/features/reservation/components/CreateReservationForm';
import ReviewForm from '@/features/review/components/ReviewForm';
import Reviews from '@/features/review/components/Reviews';
import {
  canUserReview,
  getByAccommodation,
} from '@/features/review/services/review.service';
import UserChip from '@/features/user/components/chip/UserChip';
import { getUserById } from '@/features/user/services/user.service';
import { EnvironmentTwoTone, StarTwoTone } from '@ant-design/icons';
import { Divider, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const currentUserId = useSelector(selectId);
  const currentUserRole = useSelector(selectRole);
  const [host, setHost] = useState<UserDetails>();
  const [currentIsHost, setCurrentIsHost] = useState(false);
  const [editable, setEditable] = useState(false);
  const [hostAverageGrade, setHostAverageGrade] = useState<number>(0);
  const [accommodationAverageGrade, setAccommodationAverageGrade] =
    useState<number>(0);
  const [canReview, setCanReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const reviewUpdate = useSelector(selectReviewUpdateState);
  const dispatch = useDispatch();

  useEffect(() => {
    canUserReview()
      .then((response) => setCanReview(response.data === 'True' ? true : false))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (accommodation !== undefined && reviewUpdate) {
      getByAccommodation(accommodation?.id)
        .then((response) => {
          setHostAverageGrade(response.data.host_average ?? 0);
          setAccommodationAverageGrade(
            response.data.accommodation_average ?? 0
          );
          if (response.data.items) {
            setReviews(response.data.items);
            console.log(response.data.items);
          } else {
            setReviews([]);
          }
          dispatch(setReviewUpdate(false));
        })
        .catch((error) => console.log(error));
    }
  }, [accommodation, reviewUpdate]);

  useEffect(() => {
    getByAccommodationId(id).then((response) => {
      setAvailability(response.data);
    });
    getById(id)
      .then((response) => {
        setAccommodation(response.data.item);
        const hostId = response.data.item.host_id
          ? response.data.item.host_id
          : response.data.item.host_id;
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
          <StarTwoTone twoToneColor="#FFB900" />{' '}
          {reviews.length > 0 ? (
            <>
              {getRoundedRating(accommodationAverageGrade)} ({reviews.length}{' '}
              review{reviews.length === 1 ? <></> : <>s</>})
            </>
          ) : (
            <>Not yet rated</>
          )}
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
          <div
            className={styles.accommodation__host}
            style={{ width: currentUserRole === 'host' ? '100%' : '90%' }}
          >
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
                featured={true}
                hostRating={hostAverageGrade} //TO-DO: Implement
              />
            </div>
          </div>
          <div
            className={styles.accommodation__amenities}
            style={{ width: currentUserRole === 'host' ? '100%' : '90%' }}
          >
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
        {currentUserRole === 'guest' && (
          <CreateReservationForm
            accommodation={accommodation}
            availability={availability}
          />
        )}
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
      <Divider
        orientation="left"
        orientationMargin={0}
        style={{ fontSize: '20px', fontWeight: '600', marginTop: '2rem' }}
      >
        Guest reviews
      </Divider>
      <div className={styles.reviews}>
        {canReview && (
          <ReviewForm
            hostId={accommodation?.host_id}
            accommodationId={accommodation?.id}
            accommodationName={accommodation?.name}
          />
        )}
        <Reviews
          accommodation={accommodation?.id ?? ''}
          reviews={reviews}
        />
      </div>
    </div>
  );
};

export default SingleAccommodation;
