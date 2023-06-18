import { selectId } from '@/common/store/slices/authSlice';
import { User } from '@/common/types/User';
import UserChip from '@/features/user/components/chip/UserChip';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Rate, Tooltip } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const userId = useSelector(selectId);
  const [currentIsPoster, setCurrentIsPoster] = useState(false);

  useEffect(() => {
    setCurrentIsPoster(userId === poster.id);
  }, [userId]);

  return (
    <div className={classNames('frostedGlass', styles.review)}>
      <div className={styles.review__header}>
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
      <Divider />
      <div className={styles.review__poster}>
        <UserChip
          gender={poster.gender}
          name={`${poster.firstName} ${poster.lastName}`}
          size={35}
        />
        {!currentIsPoster && (
          <div className={styles.review__buttons}>
            <Tooltip title="Edit your review.">
              <Button
                type="primary"
                ghost
                shape="circle"
                icon={<EditOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Delete your review.">
              <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleReview;
