import Button from '@/common/components/button/Button';
import { Collapse, Form, Rate } from 'antd';
import styles from '../styles/review.module.scss';

const ReviewForm = () => {
  const { Panel } = Collapse;
  const [form] = Form.useForm();

  const handleFinish = () => {
    console.log(form.getFieldsValue());
  };
  //TO-DO: Implement review form validation and submission.
  return (
    <Collapse ghost bordered={false} defaultActiveKey={0}>
      <Panel header="Leave a review" key="1">
        <Form
          form={form}
          className={styles.form}
          onFinish={handleFinish}
          layout="horizontal"
        >
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
