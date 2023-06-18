import Button from '@/common/components/button/Button';
import { CloudTwoTone, SendOutlined } from '@ant-design/icons';
import { Alert, Descriptions, Divider, Form, Input, Space } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSuggestedFlights, purchase } from '../services/flights.service';
import styles from '../styles/flights.module.scss';
import { FlightOutput } from '../types/FlightOutput';
import { FlightParameters } from '../types/FlightParameters';

const SuggestedFlights = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const parameters = router.query as unknown as FlightParameters;
  const [suggestedOutbound, setSuggestedOutbound] = useState<FlightOutput[]>(
    []
  );
  const [suggestedInbound, setSuggestedInbound] = useState<FlightOutput[]>([]);

  const handleFinish = () => {
    const params = {
      start_date: parameters.start,
      end_date: parameters.end,
      start_country: form.getFieldValue('country'),
      end_country: parameters.country,
      start_city: form.getFieldValue('city'),
      end_city: parameters.city,
      count: parameters.count,
    };
    getSuggestedFlights(params)
      .then((response) => {
        setSuggestedOutbound(response.data.outbound);
        setSuggestedInbound(response.data.inbound);
      })
      .catch((err) => console.log(err));
  };

  const handlePurchase = async (
    e: BaseSyntheticEvent,
    flight: FlightOutput
  ) => {
    const response = await purchase(
      flight.id,
      parseInt(parameters.count),
      form.getFieldValue('apiKey')
    );

    if (response.status === 200) {
      toast.success('Successfully purchased ticket.');
      e.target.disabled = true;
    } else {
      toast.error(response.data.result.Error);
    }
  };

  const flightsVisible = () =>
    !!suggestedOutbound &&
    !!suggestedInbound &&
    suggestedInbound.length > 0 &&
    suggestedOutbound.length > 0;

  return (
    <Space direction="vertical" size="middle" className={styles.wrapper}>
      <ToastContainer />
      <Alert
        closable
        message={
          <>
            All flights are provided by <b>XWS Airlines</b>.
          </>
        }
        type="info"
        description="To purchase tickets, you must have a valid API Key. If you
        don't have one yet, you can create it through your XWS Airlines account."
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
      {flightsVisible() && (
        <>
          <Divider>
            <CloudTwoTone />
          </Divider>
          {suggestedOutbound.map((flight, i) => (
            <>
              <Descriptions
                key={flight.id}
                title={
                  <>
                    <SendOutlined /> <Divider type="vertical" /> Outbound flight{' '}
                    {i + 1}
                  </>
                }
                bordered
              >
                <Descriptions.Item label="Date of departure" span={3}>
                  {dayjs(flight.date_of_departure).format('DD.MM.YYYY. HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Location" span={3}>
                  {' '}
                  {flight.route.end_point.airport_name} Airport,{' '}
                  {flight.route.end_point.airport_city},{' '}
                  {flight.route.end_point.country}
                </Descriptions.Item>
                <Descriptions.Item label="Ticket count" span={3}>
                  {parameters.count}
                </Descriptions.Item>
                <Descriptions.Item label="Total price" span={3}>
                  {flight.collective_price}
                </Descriptions.Item>
              </Descriptions>
              <Button
                type="primary"
                text="Purchase"
                action={(e) => handlePurchase(e, flight)}
              ></Button>
            </>
          ))}
          <Divider />
          {suggestedInbound.map((flight, i) => (
            <>
              <Descriptions
                title={
                  <>
                    <SendOutlined
                      style={{
                        transform: 'scale(-1, -1)',
                        marginRight: '8px',
                      }}
                    />
                    <Divider type="vertical" /> Inbound flight {i + 1}
                  </>
                }
                bordered
              >
                <Descriptions.Item label="Date of departure" span={3}>
                  {dayjs(flight.date_of_departure).format('DD.MM.YYYY. HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Location" span={3}>
                  {flight.route.end_point.airport_name} Airport,{' '}
                  {flight.route.end_point.airport_city},{' '}
                  {flight.route.end_point.country}
                </Descriptions.Item>
                <Descriptions.Item label="Ticket count" span={3}>
                  {parameters.count}
                </Descriptions.Item>
                <Descriptions.Item label="Total price" span={3}>
                  {flight.collective_price}
                </Descriptions.Item>
              </Descriptions>
              <Button
                type="primary"
                text="Purchase"
                action={(e) => handlePurchase(e, flight)}
              ></Button>
            </>
          ))}
        </>
      )}
    </Space>
  );
};

export default SuggestedFlights;
