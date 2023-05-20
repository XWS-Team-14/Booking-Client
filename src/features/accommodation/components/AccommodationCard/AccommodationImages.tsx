/* eslint-disable react/jsx-key */
import { Carousel } from 'antd';
import styles from './AccommodationCard.module.scss';

interface AccommodationImagesProps {
  images: string[];
  classname?: string;
}

export const AccommodationImages = ({
  images,
  classname,
}: AccommodationImagesProps) => {
  return (
    <Carousel draggable>
      {images.map((image) => (
        <div>
          <div className={classname ? classname : styles.imageWrapper}>
            <img
              alt="Accommodation photo"
              src={
                image.includes('localhost')
                  ? image
                  : `http://localhost:8000/api/static/images/${image}`
              }
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};
