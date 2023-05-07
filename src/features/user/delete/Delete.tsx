import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectUser } from '@/common/store/slices/authSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Warning from '../../../assets/images/warning.png';
import styles from './Delete.module.scss';

const Delete = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.email === null) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <Image
        src={Warning}
        quality={100}
        unoptimized={true}
        width={124}
        height={124}
        alt="Warning"
      />
      <div className={styles.warning}>
        <b>You&apos;re about to delete your account forever. Are you sure?</b>
      </div>
      <div className={styles.buttons}>
        <Button
          type="secondary"
          text="No, go back"
          action={() => router.push('/')}
        />
        <Button type="danger" text="Yes, I'm sure." />
      </div>
    </div>
  );
};

export default Delete;
