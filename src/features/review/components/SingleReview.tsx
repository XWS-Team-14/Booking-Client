import { User } from '@/common/types/User';
import UserChip from '@/features/user/components/chip/UserChip';
import { Divider, Rate } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import styles from '../styles/review.module.scss';

interface SingleReviewProps {
  poster: User;
  title: string;
  content: string;
  hostRating: number;
  accommodationRating: number;
  date: string;
}

const SingleReview = ({
  poster,
  title,
  content,
  hostRating,
  accommodationRating,
  date,
}: SingleReviewProps) => {
  return (
    <div className={classNames('frostedGlass', styles.review)}>
      <div className={styles.review__header}>
        <div className={styles.review__header__title}>{title}</div>
        <div className={styles.review__header__date}>
          {dayjs(date).format('DD.MM.YYYY.')}
        </div>
      </div>
      <div className={styles.review__ratings}>
        <div className={styles.review__ratings__rating}>
          Host: <Rate disabled defaultValue={hostRating} />{' '}
        </div>
        <div className={styles.review__ratings__rating}>
          Accommodation: <Rate disabled defaultValue={accommodationRating} />
        </div>
      </div>
      <div className={styles.review__content}>{content}</div>
      <Divider />
      <div className={styles.review__poster}>
        <UserChip
          gender={poster.gender}
          name={`${poster.firstName} ${poster.lastName}`}
          size={35}
        />
      </div>
    </div>
  );
};

export default SingleReview;
