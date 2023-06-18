import {
  selectAuthState,
  selectUser,
  setAuthState,
  setUserEmail,
  setUserFirstName,
  setUserGender,
  setUserHomeAddress,
  setUserLastName,
  setUserRole,
} from '@/common/store/slices/authSlice';
import api from '@/common/utils/axiosInstance';
import { logout } from '@/features/auth/services/auth.service';
import {
  DownOutlined,
  IdcardOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Divider, Dropdown, MenuProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Notifications from '@/features/notifications/compontents/Notifications';
import UserChip from '@/features/user/components/chip/UserChip';
import { getCurrentUserData } from '@/features/user/services/user.service';
import { useEffect } from 'react';
import Logo from '../../../assets/images/logo.png';
import Button from '../button/Button';
import NavigationLink from '../navigationLink/NavigationLink';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  const authState = useSelector(selectAuthState);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (authState === null) {
      const user = getCurrentUserData();
      if (user === null) {
        dispatch(setAuthState(false));
      }
    }
  }, []);

  const handleLogout = async () => {
    await logout().then(() => {
      router.push('/');
      api.defaults.headers.common.Authorization = '';
      dispatch(setAuthState(false));
      dispatch(setUserEmail(null));
      dispatch(setUserFirstName(null));
      dispatch(setUserLastName(null));
      dispatch(setUserRole(null));
      dispatch(setUserGender(null));
      dispatch(setUserHomeAddress(null));
    });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'View profile',
      onClick: () => router.push('/profile'),
      icon: <IdcardOutlined />,
    },
    {
      key: '2',
      label: 'Change email',
      onClick: () => router.push('/email/change'),
      icon: <MailOutlined />,
    },
    {
      key: '3',
      label: 'Change password',
      onClick: () => router.push('/password/change'),
      icon: <LockOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: 'Log out',
      onClick: () => handleLogout(),
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={Logo}
            width={512}
            height={512}
            quality={100}
            alt="logo"
            style={{ maxWidth: '84px', height: 'auto' }}
          />
        </Link>
      </div>
      <div className={styles.links}>
        <NavigationLink href="/" text="Home" />
        {user.role === 'host' && (
          <>
            <NavigationLink href="/accommodations" text="My accommodations" />
          </>
        )}
        {user.role === 'guest' && (
          <>
            <NavigationLink href="/reservations/history" text="Reservations" />
            <NavigationLink href="/recommended" text="Recommended" />
          </>
        )}
      </div>
      <div className={styles.buttons}>
        {authState ? (
          <div className={styles.right}>
            <Notifications />
            <Divider
              type="vertical"
              style={{ height: '2rem', marginLeft: '0.5rem' }}
            />
            <Dropdown menu={{ items }} placement="bottom">
              <a onClick={(e) => e.preventDefault()}>
                <div className={styles.dropdown}>
                  <div className={styles.user}>
                    <UserChip
                      gender={user.gender}
                      size={30}
                      name={`${user.firstName} ${user.lastName}`}
                    />
                  </div>
                  <DownOutlined style={{ fontSize: '12px' }} />
                </div>
              </a>
            </Dropdown>
          </div>
        ) : (
          <>
            <Link href="/signup">
              <Button type="primary" text="Sign up" />
            </Link>
            <Link href="/login">
              <Button type="secondary" text="Log in" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
