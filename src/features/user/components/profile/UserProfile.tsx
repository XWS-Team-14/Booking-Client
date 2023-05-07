import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectUser } from '@/common/store/slices/authSlice';
import { capitalizeFirstLetter } from '@/common/utils/textFormatter';
import { Divider, Form, Input, Modal, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserIcon from '../icon/UserIcon';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const [editable, setEditable] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newHomeAddress, setHomeAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { Option } = Select;
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user.email) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleTrySave = () => {
    setSaveModalOpen(true);
  };

  const handleSave = () => {
    setUneditableAndUnchanged();
    toast.success('Successfully updated profile.');
  };

  const handleCancel = () => {
    setCancelModalOpen(false);
    setUneditableAndUnchanged();
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
        <UserIcon type="female" size={100} />
        <div className={styles.title}>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <h2>{capitalizeFirstLetter(user.role)}</h2>
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
          <Form>
            <p>
              <b className={styles.label}>E-mail</b>
            </p>
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  type: 'email',
                  message: 'Email is not valid.',
                },
              ]}
            >
              <Input
                type="email"
                defaultValue={user.email}
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
              <b>E-mail</b>
            </p>
            <p>{user.email}</p>
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
