import styles from '../styles/accommodation.module.scss';

interface AccommodationPriceProps {
  price: number;
  days: number;
}

const AccommodationPrice = ({ price, days }: AccommodationPriceProps) => {
  return (
    <>
      <div className={styles.reserveSection__price}>€{price}</div>
      <div className={styles.reserveSection__description}>
        for {days}
        {days === 1 ? <> night</> : <> nights</>}
      </div>
    </>
  );
};

export default AccommodationPrice;
