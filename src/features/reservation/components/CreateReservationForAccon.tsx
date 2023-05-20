import { selectUser } from '@/common/store/slices/authSlice';
import { Button, DatePicker, Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccommodationById } from '../services/reservation.service';

const CreateReservationForAccom = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const accommodationId = router.query.accommodationId;
  const [loading, setLoading] = useState(true);
  const [accommodation, setAccommodation] = useState<any>();
  const [form] = Form.useForm();
  useEffect(() => {
    if (user.email === null || user.role !== 'guest') {
      router.push('/');
    } else {
      setLoading(false);
      if (accommodationId !== undefined) {
        if (!Array.isArray(accommodationId)) {
          getAccommodationById(accommodationId).then((res) => {
            setAccommodation(res);
          });
        }
      }
    }
  }, [user]);
  function onFinish(values: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="beginning_date"
        label="Beginning Date"
        rules={[
          { required: true, message: 'Please select the beginning date' },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="ending_date"
        label="Ending Date"
        rules={[{ required: true, message: 'Please select the ending date' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Reservation
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreateReservationForAccom;
