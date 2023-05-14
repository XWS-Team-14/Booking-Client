/* eslint-disable react/jsx-key */
import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectRole } from '@/common/store/slices/authSlice';
import { Checkbox, DatePicker, Form, Input, Select } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createAvailability,
  getAccomodationsByUser,
} from '../services/availability.service';
import styles from '../styles/availability.module.scss';
import AccommodationDto from '../types/accommodationDto';
import AvailabilityDto from '../types/availabilityDto';
const { RangePicker } = DatePicker;

const CreateAvailability = () => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [acomodations, setAccomodations] = useState<Array<AccommodationDto>>();
  const [start_date, setStartDate] = useState<string>('');
  const [end_date, setEndDate] = useState<string>('');
  const [enableWeekendPrice, setEnableWeekend] = useState<Boolean>(false);
  const [enableHolidayPrice, setEnableHoliday] = useState<Boolean>(false);
  const router = useRouter();
  const userRole = useSelector(selectRole);

  useEffect(() => {
    const fetchAccomodations = async () => {
      try {
        const response = await getAccomodationsByUser();
        setAccomodations(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (userRole === 'host') {
      fetchAccomodations();
    } else {
      router.push('/');
    }
  }, []);

  const onFinish = () => {
    let dto: AvailabilityDto = {
      availability_id: 'd721aefc-23df-4dce-a7f9-30e2b671a2c5',
      accomodation_id: form.getFieldValue('accomodation'),
      interval: { date_start: start_date, date_end: end_date },
      pricing_type: form.getFieldValue('pricing_type'),
      base_price: form.getFieldValue('base_price'),
      occupied_intervals: [],
      special_pricing: [],
    };
    if (enableWeekendPrice) {
      dto.special_pricing.push({
        title: 'Weekend',
        pricing_markup: form.getFieldValue('weekend_mul'),
      });
    }
    if (enableHolidayPrice) {
      dto.special_pricing.push({
        title: 'Holiday',
        pricing_markup: form.getFieldValue('holiday_mul'),
      });
    }
    console.log(dto);
    createAvailability(dto)
      .then((res) => {
        toast.success(res.data);
        router.push('/editAvailability');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    errorInfo.errorFields.map((error: any) => {
      toast.error(error.errors[0]);
    });
  };

  const onRangeChange = (dates: any, dateStrings: [string, string]) => {
    console.log(dates, dateStrings);
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  const flipWeekendFlag = () => {
    setEnableWeekend(!enableWeekendPrice);
  };

  const flipHolidayFlag = () => {
    setEnableHoliday(!enableHolidayPrice);
  };

  return loading ? (
    <Loading />
  ) : (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <ToastContainer />
        <h1>Create availability</h1>
        <Form
          form={form}
          className={styles.loginForm}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item>
            <RangePicker onChange={onRangeChange} />
          </Form.Item>

          <Form.Item
            name="accomodation"
            rules={[{ required: true, message: 'Accomodation is required.' }]}
          >
            <Select placeholder="Acomodation">
              {acomodations?.map((item) => (
                <Select.Option value={item.id}>
                  {item.name} - {item.location.country}, {item.location.city},
                  {item.location.address}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="pricing_type"
            rules={[{ required: true, message: 'PricingType is required.' }]}
          >
            <Select placeholder="Pricing type">
              <Select.Option value="Per_accomodation_unit">
                Per unit
              </Select.Option>
              <Select.Option value="Per_guest">Per guest</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            hasFeedback
            name="base_price"
            rules={[
              {
                required: true,
                message: 'Base price is required and its a number.',
              },
            ]}
          >
            <Input
              className={styles.inputField}
              placeholder="Base price"
              type="number"
              step="0.01"
              min="1"
            />
          </Form.Item>
          <Checkbox
            checked={enableWeekendPrice.valueOf()}
            onChange={(e) => flipWeekendFlag()}
          >
            Enable weekend price increase.
          </Checkbox>
          <Form.Item
            hasFeedback
            name="weekend_mul"
            rules={[
              {
                required: enableWeekendPrice.valueOf(),
                message: 'Weekend multiplyer is required and its a number',
              },
            ]}
          >
            <Input
              className={styles.inputField}
              placeholder="Weekend multiplyer"
              type="number"
              step="0.01"
              disabled={!enableWeekendPrice}
              min="1"
            />
          </Form.Item>
          <Checkbox
            checked={enableHolidayPrice.valueOf()}
            onChange={(e) => flipHolidayFlag()}
          >
            Enable holiday price increase.
          </Checkbox>
          <Form.Item
            hasFeedback
            name="holiday_mul"
            rules={[
              {
                required: enableHolidayPrice.valueOf(),
                message: 'Holiday multiplyer is required and its a number',
              },
            ]}
          >
            <Input
              className={styles.inputField}
              placeholder="Holiday multiplyer"
              type="number"
              step="0.01"
              disabled={!enableHolidayPrice}
              min="1"
            />
          </Form.Item>
          <Form.Item className={styles.submit}>
            <Button type="primary" text="Create" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default CreateAvailability;
