import { StarTwoTone } from '@ant-design/icons';
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
        <StarTwoTone style={{ color: 'yellow' }} />
        {Math.round(rating * 100) / 100}
      </div>
    </div>
  );
};
