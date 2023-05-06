import Button from '@/common/components/button/Button';
import { Divider, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserIcon from '../icon/UserIcon';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const [editable, setEditable] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const handleTrySave = () => {
    setSaveModalOpen(true);
  };

  const handleSave = () => {
    setUneditableAndUnchanged();
    toast.success('Successfully updated profile.');
  };

  const handleCancel = () => {
    if (madeChanges) {
      setCancelModalOpen(true);
    } else {
      setUneditableAndUnchanged();
    }
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

  return (
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
      <div className={styles.header}>
        <UserIcon type="female" size={100} />
        <div className={styles.title}>
          <h1>Sanja Petrović</h1>
          <h2>Host</h2>
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
              rules={[
                {
                  type: 'email',
                  message: 'Email is not valid.',
                },
              ]}
            >
              <Input
                type="email"
                defaultValue="petroviccsanja@gmail.com"
                className={styles.input}
                allowClear={true}
                onChange={() => setMadeChanges(true)}
              ></Input>
            </Form.Item>
            <p>
              <b className={styles.label}>Home address</b>
            </p>
            <Form.Item name="address">
              <Input
                type="text"
                defaultValue="Miše Dimitrijevića 11, Novi Sad, Serbia"
                className={styles.input}
                allowClear={true}
                onChange={() => setMadeChanges(true)}
              ></Input>
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
            <p>petroviccsanja@gmail.com</p>
            <p>
              <b>Home address</b>
            </p>
            <p>Miše Dimitrijevića 11, Novi Sad, Serbia</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
