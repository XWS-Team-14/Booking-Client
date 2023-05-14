import { Rate } from 'antd';
import styles from './AccommodationCard.module.scss';

interface AccommodationHeaderProps {
  title: string;
  rating: number;
}
export const AccommodationHeader = ({
  title,
  rating,
}: AccommodationHeaderProps) => {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.header__rating}>
        {Math.round(rating * 100) / 100}{' '}
        <Rate disabled defaultValue={Math.floor(rating)} allowHalf />
      </div>
    </div>
  );
};
