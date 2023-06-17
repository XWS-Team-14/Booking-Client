import Button from '@/common/components/button/Button';
import { CloudTwoTone, SendOutlined } from '@ant-design/icons';
import { Alert, Descriptions, Divider, Form, Input, Space } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/flights.module.scss';
import { FlightParameters } from '../types/FlightParameters';

const SuggestedFlights = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const parameters = router.query as unknown as FlightParameters;
  const [loadedFlights, setLoadedFlights] = useState(false);

  const handleFinish = () => {
    console.log(form.getFieldsValue());
    setLoadedFlights(true);
  };

  return (
    <Space direction="vertical" size="middle" className={styles.wrapper}>
      <Alert
        closable
        message={
          <>
            All flights are provided by <b>XWS Airlines</b>.
          </>
        }
        type="info"
        description="To purchase tickets, you must have a valid API Key. If you
        don't have one yet, you can create it through your XWS Airlines account.."
        showIcon
      ></Alert>
      <p>Location of origin</p>
      <Form
        form={form}
        className={styles.form}
        layout="inline"
        onFinish={handleFinish}
      >
        <Form.Item
          name="city"
          hasFeedback
          label="City"
          rules={[{ required: true, message: 'Origin city is required.' }]}
        >
          <Input style={{ width: '220px' }}></Input>
        </Form.Item>
        <Form.Item
          name="country"
          hasFeedback
          label="Country"
          rules={[{ required: true, message: 'Origin country is required.' }]}
        >
          <Input style={{ width: '220px' }}></Input>
        </Form.Item>
        <Form.Item
          name="apiKey"
          hasFeedback
          label="API Key"
          rules={[{ required: true, message: 'API Key is required.' }]}
          style={{ flexGrow: '1' }}
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <Button
          type="primary"
          text="Suggest flights"
          style={{ height: 'fit-content' }}
        />
      </Form>
      {loadedFlights && (
        <>
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
        </>
      )}
    </Space>
  );
};

export default SuggestedFlights;
