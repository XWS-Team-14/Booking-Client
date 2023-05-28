import { Spin } from 'antd';
import styles from '../styles/accommodation.module.scss';

interface AccommodationPriceProps {
  price: number;
  days: number;
  loading?: boolean;
}

const AccommodationPrice = ({
  price,
  days,
  loading,
}: AccommodationPriceProps) => {
  return (
    <>
      <div className={styles.reserveSection__price}>
        €{price} {loading && <Spin size="small" />}
      </div>
      <div className={styles.reserveSection__description}>
        for {days}
        {days === 1 ? <> night</> : <> nights</>}
      </div>
    </>
  );
};

export default AccommodationPrice;
