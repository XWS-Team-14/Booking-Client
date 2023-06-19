import Review from '@/common/types/Review';
import { List } from 'antd';
import styles from '../styles/review.module.scss';
import SingleReview from './SingleReview';

interface ReviewsProps {
  accommodation: string;
  setAverage: any;
  reviews: Review[];
}

const Reviews = ({ accommodation, setAverage, reviews }: ReviewsProps) => {
  return (
    <List
      style={{ width: '100%' }}
      itemLayout="horizontal"
      dataSource={reviews}
      grid={{ gutter: 16, column: 2 }}
      className={styles.reviews}
      locale={{ emptyText: 'No reviews yet.' }}
      renderItem={(item, index) => (
        <SingleReview
          id={item.id}
          poster={item.poster}
          hostRating={item.host_rating}
          accommodationRating={item.accommodation_rating}
          date={item.timestamp}
        />
      )}
    />
  );
};

export default Reviews;
