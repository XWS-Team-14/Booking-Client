import { selectUser } from '@/common/store/slices/authSlice';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import styles from '../styles/review.module.scss';
import SingleReview from './SingleReview';

interface ReviewsProps {
  accommodation: string;
}

const Reviews = ({ accommodation }: ReviewsProps) => {
  //TO-DO: Implement review retrieval instead of the reviews array. Sort by date posted.
  const reviews = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  const user = useSelector(selectUser); //TO-DO: Remove.
  //TO-DO: Replace placeholder values with actual ones.
  return (
    <List
      itemLayout="horizontal"
      dataSource={reviews}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '50', '100', '1000'],
        position: 'bottom',
        align: 'start',
      }}
      className={styles.reviews}
      renderItem={(item /*: Review*/, index) => (
        <SingleReview
          poster={user} //item.poster
          title="Best hotel ever" //item.title
          content="EXCEPTIONAL home! If you are looking for combination of luxury, privacy, serenity, nature, and authenticity- this is it!!! A perfect 10. This villa sits in a quiet fishing village right upon the waterfront without cars or tourism immediately around, yet proximity to Kotor is 10 minutes and many adventures are out the door. The villa is finished to a very high standard with smartly chosen, minimalist furnishings and high end appliances. Adventure abounds with a Stunning hike up the fjord behind the village to Ivan’s church or a peaceful paddle board followed by a swim in the ocean, jacuzzi soak, and wine on the patio. The communication and welcome were delightful. I hope you love this special gem as much as I do!" //item.content
          hostRating={5} //item.hostRating
          accommodationRating={5} //item.accommodationRating
          date="2023-06-01" //item.date
        />
      )}
    />
  );
};

export default Reviews;
