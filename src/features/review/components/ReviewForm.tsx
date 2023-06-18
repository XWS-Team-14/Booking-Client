import Button from '@/common/components/button/Button';
import { Collapse, Form, Input, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from '../styles/review.module.scss';
import { createReview } from '../services/review.service';
import { toast } from 'react-toastify';
import router from 'next/router';
import { CreateReviewDto } from '../types/ReviewDto';

interface ReviewFormProps {
  accommodation_id: string;
  host_id : string;
}
const ReviewForm = ({ accommodation_id, host_id }: ReviewFormProps ) => {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    let formData = new FormData();
    formData.append('host_id', host_id);
    formData.append('accommodation_id', accommodation_id);
    formData.append('host_rating', values.rateHost);
    formData.append('accommodation_rating', values.rateAccommodation);
    const dto: CreateReviewDto = {
      accommodation_id: accommodation_id,
      host_id: host_id,
      host_rating:  values.rateHost,
      accommodation_rating: values.rateAccommodation

    };
   await createReview(dto)
      .then((res) => {
        toast.success('Success');
        //router.push('/accommodations');
      })
      .catch((err) => {
        toast.error(err);
      });
      
  }
  //TO-DO: Implement review form validation and submission.
  return (
    <Collapse ghost bordered={false} defaultActiveKey={0}>
      <Panel header="Leave a review" key="1">
        <Form form={form}  onFinish={onFinish}
          className={styles.form}>
          <div className={styles.form__ratings}>
          <Form.Item
              name="rateHost"
              className={styles.formratingsrating}
              label="Host"
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="rateAccommodation"
              className={styles.formratingsrating}
              label="Accommodation"
            >
              <Rate />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary"   text="Submit review" />
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default ReviewForm;
