import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import {
  selectAuthState,
  selectUser,
  setAuthState,
  setUserEmail,
  setUserFirstName,
  setUserGender,
  setUserLastName,
  setUserRole,
} from '@/common/store/slices/authSlice';
import api from '@/common/utils/axiosInstance';
import { deleteAccount } from '@/features/user/services/user.service';
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

  const authState = useSelector(selectAuthState);

  useEffect(() => {
    if (authState === null) {
      console.log('waiting...');
    } else if (authState) {
      setLoading(false);
    } else {
      router.push('/');
    }
  }, [authState]);

  const confirm = async () => {
    await deleteAccount()
      .then((res) => {
        router.push('/');
        api.defaults.headers.common.Authorization = '';
        dispatch(setAuthState(false));
        dispatch(setUserEmail(null));
        dispatch(setUserFirstName(null));
        dispatch(setUserLastName(null));
        dispatch(setUserRole(null));
        dispatch(setUserGender(null));
      })
      .catch((err) => console.log(err));
  };

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
        <Button type="danger" text="Yes, I'm sure." action={confirm} />
      </div>
    </div>
  );
};

export default Delete;
