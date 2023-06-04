import Button from '@/common/components/button/Button';
import { Collapse, Form, Input, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from '../styles/review.module.scss';

const ReviewForm = () => {
  const { Panel } = Collapse;
  const [form] = Form.useForm();

  //TO-DO: Implement review form validation and submission.
  return (
    <Collapse ghost bordered={false} defaultActiveKey={['1']}>
      <Panel header="Leave a review" key="1">
        <Form form={form} className={styles.form}>
          <div className={styles.form__ratings}>
            <Form.Item name="rateHost" className={styles.form__ratings__rating}>
              Host rating
              <br />
              <Rate />
            </Form.Item>
            <Form.Item
              name="rateAccommodation"
              className={styles.form__ratings__rating}
            >
              Accommodation rating
              <br />
              <Rate />
            </Form.Item>
          </div>
          <Form.Item className={styles.form__title}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item>
            <TextArea
              autoSize={{ minRows: 5, maxRows: 12 }}
              placeholder="Write your review here."
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" text="Submit review" />
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default ReviewForm;
