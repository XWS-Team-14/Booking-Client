import Image from 'next/image';
import NotFoundImage from '../../../assets/images/not-found.png';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <Image
        src={NotFoundImage}
        quality={100}
        unoptimized={true}
        width={80}
        height={80}
        alt="404"
      />
      <h1>Page not found :(</h1>
      <p>
        The page you&apos;re looking for is no longer here, or never existed.
      </p>
    </div>
  );
};

export default NotFound;
