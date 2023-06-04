import { User } from '@/common/types/User';
import UserChip from '@/features/user/components/chip/UserChip';
import { Divider, Rate } from 'antd';
import classNames from 'classnames';
import styles from '../styles/review.module.scss';

interface CommentProps {
  poster: User;
  title: string;
  content: string;
  hostRating: number;
  accommodationRating: number;
  date: string;
}

const Comment = ({
  poster,
  title,
  content,
  hostRating,
  accommodationRating,
  date,
}: CommentProps) => {
  return (
    <div className={classNames('frostedGlass', styles.comment)}>
      <div className={styles.comment__title}>{title}</div>
      <div className={styles.comment__ratings}>
        <div className={styles.comment__ratings__rating}>
          Host: <Rate disabled defaultValue={hostRating} />{' '}
        </div>
        <div className={styles.comment__ratings__rating}>
          Accommodation: <Rate disabled defaultValue={accommodationRating} />
        </div>
      </div>
      <div className={styles.comment__content}>{content}</div>
      <Divider />
      <div className={styles.comment__poster}>
        <UserChip
          gender={poster.gender}
          name={`${poster.firstName} ${poster.lastName}`}
          size={35}
        />
      </div>
    </div>
  );
};

export default Comment;
