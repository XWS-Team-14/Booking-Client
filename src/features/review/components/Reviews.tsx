import { selectUser } from '@/common/store/slices/authSlice';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import styles from '../styles/review.module.scss';
import SingleReview from './SingleReview';
import { getByAccommodation } from '../services/review.service';
import { useEffect, useState } from 'react';
import Review from '@/common/types/Review';
import { ReviewDto } from '../types/ReviewDto';

interface ReviewsProps {
  accommodation: string;
  setAverage : any;
}

const Reviews = ({ accommodation, setAverage }: ReviewsProps ) => {
  //TO-DO: Implement review retrieval instead of the reviews array. Sort by date posted.
  const [reviews, setReviews] = useState<any[]>([]);
  
  useEffect(() => {
    getByAccommodation(accommodation)
      .then((res) => {
        setReviews(res.data.items);
      })
      .catch((error) => console.log(error));
  }, [accommodation]);
  useEffect(() => {
    calculateAverage();
  }, [reviews]);
  const calculateAverage = () => 
  {
    let totalHostGrade : number = 0;
    let totalAccommodationGrade : number = 0;
    reviews.forEach((item) =>{
      totalHostGrade += item.host_rating;
      totalAccommodationGrade += item.accommodation_rating;
    })
    setAverage(totalHostGrade/reviews.length,totalAccommodationGrade/reviews.length)
    
    
  }
  //const user = useSelector(selectUser); //TO-DO: Remove.
  //TO-DO: Replace placeholder values with actual ones.
  return (
    <List
      itemLayout="horizontal"
      dataSource={reviews}
      grid={{ gutter: 16, column: 2 }}
      className={styles.reviews}
      renderItem={(item, index) => (
        <SingleReview
          id={item.id}
          poster={item.poster} //item.poster
          hostRating={item.host_rating}
          accommodationRating={item.accommodation_rating}
          date={item.timestamp}  
          />
      )}
    />
  );
};

export default Reviews;
