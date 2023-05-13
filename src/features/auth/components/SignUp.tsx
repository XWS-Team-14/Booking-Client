import Button from '@/common/components/button/Button';
import { Divider, Form, Input, Select } from 'antd';
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
  const { Option } = Select;
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
      home_address: values.home_address,
      gender: values.gender,
      role: values.role,
      email: values.email,
      password: values.password,
    })
      .then((res) => router.push('/'))
      .catch((err) => {
        if (err.response.data) {
          toast.error(err.response.data);
        }
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    errorInfo.errorFields.map((error: any) => {
      toast.error(error.errors[0]);
    });
  };
  return loading ? (
    <></>
  ) : (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <ToastContainer />
        <Form
          form={form}
          className={styles.loginForm}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Divider>Personal information</Divider>
          <Form.Item
            hasFeedback
            name="first_name"
            rules={[{ required: true, message: 'First name is required.' }]}
          >
            <Input
              allowClear
              className={styles.inputField}
              placeholder="First name"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="last_name"
            rules={[{ required: true, message: 'Last name is required.' }]}
          >
            <Input
              allowClear
              className={styles.inputField}
              placeholder="Last name"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="gender"
            rules={[{ required: true, message: 'Gender is required.' }]}
          >
            <Select placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            hasFeedback
            name="home_address"
            rules={[{ required: true, message: 'Home address is required.' }]}
          >
            <Input
              allowClear
              className={styles.inputField}
              placeholder="Home address"
            />
          </Form.Item>
          <Divider>Account</Divider>
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
              allowClear
              className={styles.inputField}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password"
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
              type="password"
              allowClear
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
            dependencies={['password']}
            rules={[
              { required: true, message: 'Password is required.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match.'));
                },
              }),
            ]}
          >
            <Input.Password
              className={styles.inputField}
              type="password"
              allowClear
              placeholder="Confirm password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              hasFeedback
              name="role"
              rules={[{ required: true, message: 'Role is required.' }]}
            >
              <Select placeholder="Joining as a...">
                <Option value="host">Host</Option>
                <Option value="guest">Guest</Option>
              </Select>
            </Form.Item>
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
