import Button from '@/common/components/button/Button';
import { selectAuthState, selectUser } from '@/common/store/slices/authSlice';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePassword } from '../services/auth.service';
import styles from '../styles/auth.module.scss';
import PasswordChangeDto from '../types/PasswordChangeDto';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [newPasswordCheckVisible, setNewPasswordCheckVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (values: PasswordChangeDto) => {
    await updatePassword(values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return loading ? (
    <></>
  ) : (
    <section className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.differentTitle}>Change password</h1>
        <Form
          form={form}
          className={styles.loginForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="old_password"
            rules={[{ required: true, message: 'Old password is required.' }]}
          >
            <Input.Password
              className={styles.inputField}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Old password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item
            name="new_password"
            rules={[
              { required: true, message: 'New password is required.' },
              {
                min: 8,
                message:
                  'New password is too short. It must be at least 8 characters.',
              },
            ]}
          >
            <Input.Password
              className={styles.inputField}
              prefix={<LockOutlined />}
              type="password"
              placeholder="New password"
              visibilityToggle={{
                visible: newPasswordVisible,
                onVisibleChange: setNewPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item
            name="newCheck"
            hasFeedback
            dependencies={['new_password']}
            rules={[
              { required: true, message: 'New password is required.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match.'));
                },
              }),
            ]}
          >
            <Input.Password
              className={styles.inputField}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm new password"
              visibilityToggle={{
                visible: newPasswordCheckVisible,
                onVisibleChange: setNewPasswordCheckVisible,
              }}
            />
          </Form.Item>
          <Form.Item className={styles.submit}>
            <Button type="primary" text="Confirm" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default ChangePassword;
