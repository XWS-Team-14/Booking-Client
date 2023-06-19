import Button from '@/common/components/button/Button';
import { setReviewUpdate } from '@/common/store/slices/updateSlice';
import { Collapse, Form, Rate } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createReview } from '../services/review.service';
import styles from '../styles/review.module.scss';
import { CreateReviewDto } from '../types/ReviewDto';

interface ReviewFormProps {
  accommodationId?: string;
  hostId?: string;
}

const ReviewForm = ({ accommodationId, hostId }: ReviewFormProps) => {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    const dto: CreateReviewDto = {
      accommodation_id: accommodationId ?? '',
      host_id: hostId ?? '',
      host_rating: values.rateHost,
      accommodation_rating: values.rateAccommodation,
    };
    await createReview(dto)
      .then((res) => {
        toast.success('Successfully created your review.');
        dispatch(setReviewUpdate(true));
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
