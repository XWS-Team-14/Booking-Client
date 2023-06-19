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
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Warning from '../../../assets/images/warning.png';
import { deleteAccountSaga } from '../services/user.service';
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

  const confirm = () => {
    const url = `ws://localhost:8888/api/v1/orchestrator/status`;
    const ws = new WebSocket(url);
    ws.onopen = async (event) => {
      ws.send('Connect');
      await deleteAccountSaga()
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    };
    ws.onmessage = (e) => {
      if (e.data.includes('success')) {
        api.defaults.headers.common.Authorization = '';
        dispatch(setAuthState(false));
        dispatch(setUserEmail(null));
        dispatch(setUserFirstName(null));
        dispatch(setUserLastName(null));
        dispatch(setUserRole(null));
        dispatch(setUserGender(null));
        router.push('/');
        toast.success('Successfully deleted your account.');
      } else {
        toast.error('There was an error deleting your account.');
        router.push('/');
      }
    };
    return () => ws.close();
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <ToastContainer />
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
