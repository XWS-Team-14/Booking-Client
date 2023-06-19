import Button from '@/common/components/button/Button';
import { selectUser } from '@/common/store/slices/authSlice';
import { setReviewUpdate } from '@/common/store/slices/updateSlice';
import { notify } from '@/features/notifications/services/notification.service';
import Notification from '@/features/notifications/types/Notification';
import { Collapse, Form, Rate } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createReview } from '../services/review.service';
import styles from '../styles/review.module.scss';
import { CreateReviewDto } from '../types/ReviewDto';

interface ReviewFormProps {
  accommodationId?: string;
  hostId?: string;
  accommodationName?: string;
}

const ReviewForm = ({
  accommodationId,
  hostId,
  accommodationName,
}: ReviewFormProps) => {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const onFinish = async (values: any) => {
    const dto: CreateReviewDto = {
      accommodation_id: accommodationId ?? '',
      host_id: hostId ?? '',
      host_rating: values.rateHost,
      accommodation_rating: values.rateAccommodation,
    };
    await createReview(dto)
      .then(async (res) => {
        toast.success('Successfully created your review.');
        dispatch(setReviewUpdate(true));
        const notification: Notification = {
          type: 'host-accommodation-new-review',
          sender: {
            name: `${user.firstName} ${user.lastName}`,
            id: user.id,
          },
          accommodation: {
            id: accommodationId ?? '',
            name: accommodationName ?? '',
          },
          receiver: {
            id: hostId ?? '',
          },
          status: 'unread',
          timestamp: dayjs().format('YYYY-MM-DD HH:mm').toString(),
        };
        const notification2: Notification = {
          type: 'host-new-review',
          sender: {
            name: `${user.firstName} ${user.lastName}`,
            id: user.id,
          },
          accommodation: {
            id: accommodationId ?? '',
            name: accommodationName ?? '',
          },
          receiver: {
            id: hostId ?? '',
          },
          status: 'unread',
          timestamp: dayjs().format('YYYY-MM-DD HH:mm').toString(),
        };
        await notify(notification)
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
        await notify(notification2)
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  //TO-DO: Implement review form validation and submission.
  return (
    <Collapse ghost bordered={false} defaultActiveKey={0}>
      <Panel header="Leave a review" key="1">
        <Form form={form} onFinish={onFinish} className={styles.form}>
          <div className={styles.form__ratings}>
            <Form.Item
              name="rateHost"
              className={styles.form__ratings__rating}
              label="Host"
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="rateAccommodation"
              className={styles.form__ratings__rating}
              label="Accommodation"
            >
              <Rate />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" text="Submit review" />
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default ReviewForm;
