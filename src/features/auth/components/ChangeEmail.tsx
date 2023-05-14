import Button from '@/common/components/button/Button';
import { selectUser } from '@/common/store/slices/authSlice';
import { Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateEmail } from '../services/auth.service';
import styles from '../styles/auth.module.scss';
import EmailChangeDto from '../types/EmailChangeDto';

const ChangeEmail = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.email === null) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [user]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (values: EmailChangeDto) => {
    await updateEmail(values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return loading ? (
    <></>
  ) : (
    <section className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.differentTitle}>Change email address</h1>
        <Form
          form={form}
          className={styles.loginForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            hasFeedback
            name="old_email"
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
              placeholder="Old email address"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="new_email"
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
              placeholder="New email address"
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

export default ChangeEmail;
