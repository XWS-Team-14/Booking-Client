/* eslint-disable react/jsx-key */
import { Carousel } from 'antd';
import styles from './AccommodationCard.module.scss';

interface AccommodationImagesProps {
  images: string[];
}

export const AccommodationImages = ({ images }: AccommodationImagesProps) => {
  return (
    <Carousel draggable>
      {images.map((image) => (
        <div>
          <div className={styles.imageWrapper}>
            <img src={image} />
          </div>
        </div>
      ))}
    </Carousel>
  );
};
