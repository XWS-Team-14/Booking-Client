import Button from '@/common/components/button/Button';
import { CloudTwoTone, SendOutlined } from '@ant-design/icons';
import { Descriptions, Divider, Form, Input, Space } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import styles from '../styles/flights.module.scss';
import { FlightParameters } from '../types/FlightParameters';
const SuggestedFlights = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const parameters = router.query as unknown as FlightParameters;
  return (
    <Space direction="vertical" size="middle" className={styles.wrapper}>
      <p>Location of origin</p>
      <Form form={form} className={styles.form} layout="inline">
        <Form.Item name="city" label="City">
          <Input></Input>
        </Form.Item>
        <Form.Item name="country" label="Country">
          <Input></Input>
        </Form.Item>
      </Form>
      <Divider>
        <CloudTwoTone />
      </Divider>
      <Descriptions
        title={
          <>
            <SendOutlined /> <Divider type="vertical" /> Outbound flight
          </>
        }
        bordered
      >
        <Descriptions.Item label="Date of departure" span={3}>
          {dayjs(parameters.end).format('DD.MM.YYYY.')}
        </Descriptions.Item>
        <Descriptions.Item label="Location" span={3}>
          {parameters.city}, {parameters.country}
        </Descriptions.Item>
        <Descriptions.Item label="Ticket count" span={3}>
          {parameters.count}
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary" text="Purchase"></Button>
      <Divider />
      <Descriptions
        title={
          <>
            <SendOutlined
              style={{ transform: 'scale(-1, -1)', marginRight: '8px' }}
            />
            <Divider type="vertical" /> Inbound flight
          </>
        }
        bordered
      >
        <Descriptions.Item label="Date of departure" span={3}>
          {dayjs(parameters.start).format('DD.MM.YYYY.')}
        </Descriptions.Item>
        <Descriptions.Item label="Location" span={3}>
          {parameters.city}, {parameters.country}
        </Descriptions.Item>
        <Descriptions.Item label="Ticket count" span={3}>
          {parameters.count}
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary" text="Purchase"></Button>
    </Space>
  );
};

export default SuggestedFlights;
