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
    </div>
  );
};
