import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import {
  selectAuthState,
  selectUser,
  setHostFeatured,
  setUserFirstName,
  setUserGender,
  setUserHomeAddress,
  setUserLastName,
} from '@/common/store/slices/authSlice';
import { UserDetails } from '@/common/types/User';
import { capitalizeFirstLetter } from '@/common/utils/textFormatter';
import { notify } from '@/features/notifications/services/notification.service';
import Notification from '@/features/notifications/types/Notification';
import { Divider, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUserData, updateUser } from '../../services/user.service';
import UserIcon from '../icon/UserIcon';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const [editable, setEditable] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { Option } = Select;
  const [form] = Form.useForm();
  const user = useSelector(selectUser);

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

  useEffect(() => {
    if (user.role === 'host') {
      const url = `ws://localhost:8888/api/v1/user/status/${user.id}`;
      const ws = new WebSocket(url);
      ws.onopen = (event) => {
        ws.send('Connect');
      };
      ws.onmessage = async (e) => {
        const featured =
          e.data.includes('True') || e.data.includes('true') ? true : false;
        if (featured) {
          dispatch(setHostFeatured(true));
        } else if (e.data.includes('False') || e.data.includes('false')) {
          dispatch(setHostFeatured(false));
        }
        const notification: Notification = {
          type: featured ? 'featured-host-gained' : 'featured-host-lost',
          sender: {
            name: `${user.firstName} ${user.lastName}`,
            id: user.id,
          },
          accommodation: {
            id: '',
            name: '',
          },
          receiver: {
            id: user.id,
          },
          status: 'unread',
          timestamp: dayjs().format('YYYY-MM-DD HH:mm').toString(),
        };
        await notify(notification)
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      };
      return () => ws.close();
    }
  }, [user.id, user.role]);

  const handleTrySave = () => {
    setSaveModalOpen(true);
  };

  const handleSave = async () => {
    const dto = {
      first_name: form.getFieldValue('firstName')
        ? form.getFieldValue('firstName')
        : user.firstName,
      last_name: form.getFieldValue('lastName')
        ? form.getFieldValue('lastName')
        : user.lastName,
      gender: form.getFieldValue('gender')
        ? form.getFieldValue('gender')
        : user.gender,
      home_address: form.getFieldValue('address')
        ? form.getFieldValue('address')
        : user.address,
    } as UserDetails;
    await updateUser(dto)
      .then(async (res) => {
        setUneditableAndUnchanged();
        form.resetFields();
        toast.success('Successfully updated profile.');
        const user = await getCurrentUserData();
        if (user) {
          dispatch(setUserFirstName(user.firstName));
          dispatch(setUserLastName(user.lastName));
          dispatch(setUserGender(user.gender));
          dispatch(setUserHomeAddress(user.homeAddress));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setCancelModalOpen(false);
    setUneditableAndUnchanged();
    form.resetFields();
  };

  const handleTryCancel = () => {
    if (madeChanges) {
      setCancelModalOpen(true);
    } else {
      setUneditableAndUnchanged();
    }
  };

  const setUneditableAndUnchanged = () => {
    setEditable(false);
    setMadeChanges(false);
    setCancelModalOpen(false);
    setSaveModalOpen(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <ToastContainer />
      <Modal
        title="Discard changes"
        centered
        open={cancelModalOpen}
        onCancel={() => setCancelModalOpen(false)}
        onOk={handleCancel}
        cancelText="No, take me back"
        okText="Yes, I'm sure"
      >
        <p>Are you sure you want to discard changes?</p>
      </Modal>
      <Modal
        title="Save changes"
        centered
        open={saveModalOpen}
        onCancel={() => setSaveModalOpen(false)}
        onOk={handleSave}
        cancelText="No, take me back"
        okText="Yes, I'm sure"
      >
        <p>Are you sure you want to change your profile information?</p>
      </Modal>
      <Modal
        title="Delete account"
        centered
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={() => router.push('/delete')}
        cancelText="No, I want to keep my account"
        okText="Yes, I'm sure"
        okType="danger"
      >
        <p>Are you sure you want to permanently delete your account?</p>
      </Modal>
      <div className={styles.header}>
        <UserIcon type={user.gender} size={100} />
        <div className={styles.title}>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <h2>
            {user.role === 'host' && user.isFeatured
              ? 'Featured host'
              : capitalizeFirstLetter(user.role)}
          </h2>
        </div>
      </div>
      <Divider />
      <div className={styles.info}>
        {!editable && (
          <Button
            type="secondary"
            text="Edit profile"
            style={{ float: 'right' }}
            action={() => setEditable(true)}
          ></Button>
        )}
        {editable ? (
          <Form form={form}>
            <p>
              <b className={styles.label}>First name</b>
            </p>
            <Form.Item name="firstName" hasFeedback>
              <Input
                type="text"
                defaultValue={user.firstName}
                className={styles.input}
                allowClear={true}
                onChange={() => setMadeChanges(true)}
              ></Input>
            </Form.Item>
            <p>
              <b className={styles.label}>Last name</b>
            </p>
            <Form.Item name="lastName" hasFeedback>
              <Input
                type="text"
                defaultValue={user.lastName}
                className={styles.input}
                allowClear={true}
                onChange={() => setMadeChanges(true)}
              ></Input>
            </Form.Item>
            <p>
              <b className={styles.label}>Home address</b>
            </p>
            <Form.Item name="address" hasFeedback>
              <Input
                type="text"
                defaultValue={user.address}
                className={styles.input}
                allowClear={true}
                onChange={() => setMadeChanges(true)}
              ></Input>
            </Form.Item>

            <p>
              <b className={styles.label}>Gender</b>
            </p>
            <Form.Item hasFeedback name="gender" className={styles.input}>
              <Select
                defaultValue={user.gender}
                className={styles.input}
                onChange={() => setMadeChanges(true)}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <div className={styles.buttons}>
              <Button
                type="secondary"
                text="Cancel"
                action={handleTryCancel}
              ></Button>
              {madeChanges && (
                <Button
                  type="primary"
                  text="Save changes"
                  action={handleTrySave}
                ></Button>
              )}
            </div>
          </Form>
        ) : (
          <>
            <p>
              <b>Home address</b>
            </p>
            <p>{user.address}</p>
            <p>
              <b>Gender</b>
            </p>
            <p>{capitalizeFirstLetter(user.gender)}</p>
          </>
        )}
      </div>
      <Divider />
      <Button
        type="transparent"
        text="Delete account"
        style={{ color: 'red' }}
        action={() => setDeleteModalOpen(true)}
      />
    </div>
  );
};

export default UserProfile;
