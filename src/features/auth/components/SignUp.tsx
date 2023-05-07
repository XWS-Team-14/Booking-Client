import Button from '@/common/components/button/Button';
import {
  HomeOutlined,
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { ToastContainer, toast } from 'react-toastify';

import Link from 'next/link';

import { selectUser } from '@/common/store/slices/authSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../services/auth.service';
import styles from '../styles/auth.module.scss';
import RegisterDto from '../types/RegisterDto';

const SignUp = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.email !== null) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [user]);

  const onFinish = (values: RegisterDto) => {
    console.log('Success:', values);
    register({
      first_name: values.first_name,
      last_name: values.last_name,
      address: values.address,
      email: values.email,
      password1: values.password1,
      password2: values.password2,
    })
      .then((res) => router.push('/'))
      .catch((err) => {
        if (err.response.data.non_field_errors) {
          err.response.data.non_field_errors.map((error: string) => {
            toast.error(error);
          });
        }
        if (err.response.data.email) {
          toast.error(err.response.data.email[0]);
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    errorInfo.errorFields.map((error: any) => {
      toast.error(error.errors[0]);
    });
  };
  return (loading ? <></> : 
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <ToastContainer />
        <h1 className={styles.title}>Welcome!</h1>
        <Form
          form={form}
          className={styles.loginForm}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            hasFeedback
            name="first_name"
            rules={[{ required: true, message: 'First name is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<IdcardOutlined />}
              placeholder="First name"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="last_name"
            rules={[{ required: true, message: 'Last name is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<UserOutlined />}
              placeholder="Last name"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="address"
            rules={[{ required: true, message: 'Home address is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<HomeOutlined />}
              placeholder="Home address"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="email"
            rules={[
              { required: true, message: 'Email is required.' },
              {
                type: 'email',
                message: 'Email is not valid.',
              },
            ]}
          >
            <Input
              className={styles.inputField}
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password1"
            rules={[
              { required: true, message: 'Password is required.' },
              {
                min: 8,
                message:
                  'Password is too short. It must be at least 8 characters.',
              },
            ]}
          >
            <Input.Password
              className={styles.inputField}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item
            name="password2"
            hasFeedback
            dependencies={['password1']}
            rules={[
              { required: true, message: 'Password is required.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password1') === value) {
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
              placeholder="Confirm password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item className={styles.submit}>
            <Button type="primary" text="Sign up" style={{ width: '100%' }} />
            <p>
              Already have an account?{' '}
              <b>
                <Link href="/login">Log in here!</Link>
              </b>
            </p>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default SignUp;
