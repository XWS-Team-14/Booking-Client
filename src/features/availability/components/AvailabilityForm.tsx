import Button from '@/common/components/button/Button';
import { Availability } from '@/common/types/Availability';
import { checkIfEmptyObject } from '@/common/utils/checkIfEmptyObject';
import { isDateBeforeToday } from '@/common/utils/dateHelper';
import { DatePicker, Divider, Form, InputNumber, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import styles from '../styles/availability.module.scss';
import { isSpecialPricingOn } from '../utils/isSpecialPricingOn';

interface AvailabilityFormProps {
  availability?: Availability;
  cancelAction?: () => void;
  submitAction?: () => void;
}

const AvailabilityForm = ({
  availability,
  cancelAction,
  submitAction,
}: AvailabilityFormProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [displayWeekendMultiplier, setDisplayWeekendMultiplier] = useState(
    isSpecialPricingOn('Weekend', availability)
  );
  const [displayHolidayMultiplier, setDisplayHolidayMultiplier] = useState(
    isSpecialPricingOn('Holiday', availability)
  );

  const initialValues = () => {
    if (!!availability === false || checkIfEmptyObject(availability)) return [];
    if (availability && !checkIfEmptyObject(availability)) {
      return {
        basePrice: availability.base_price,
        dates: [
          dayjs(availability.interval.date_start),
          dayjs(availability.interval.date_end),
        ],
        pricingStrategy: {
          label: availability.pricing_type.includes('guest')
            ? 'Per guest'
            : 'Per unit',
          value: availability.pricing_type,
        },
        weekendSwitch: isSpecialPricingOn('Weekend', availability),
        holidaySwitch: isSpecialPricingOn('Holiday', availability),
        weekendMultiplier: availability.special_pricing
          ? availability.special_pricing[0].pricing_markup
          : 1,
        holidayMultiplier: availability.special_pricing
          ? availability.special_pricing[1].pricing_markup
          : 1,
      };
    } else {
      return [];
    }
  };

  return (
    <Form
      form={form}
      initialValues={initialValues()}
      onFinish={submitAction}
      onFinishFailed={cancelAction}
    >
      <Divider orientation="left" orientationMargin={0}>
        Dates
      </Divider>
      <Form.Item hasFeedback name="dates">
        <DatePicker.RangePicker
          format="dddd, MMMM DD, YYYY"
          allowClear
          disabledDate={isDateBeforeToday}
        />
      </Form.Item>
      <Divider orientation="left" orientationMargin={0}>
        Price
      </Divider>
      <Form.Item hasFeedback name="basePrice">
        <InputNumber
          prefix="€"
          placeholder="Base price"
          style={{
            width: '100%',
          }}
        ></InputNumber>
      </Form.Item>
      <Form.Item hasFeedback name="pricingStrategy" valuePropName="value">
        <Select placeholder="Pricing strategy" optionLabelProp="label">
          <Option value="Per_accommodation_unit" label="Per unit">
            Per unit
          </Option>
          <Option value="Per_guest" label="Per guest">
            Per guest
          </Option>
        </Select>
      </Form.Item>
      <Divider orientation="left" orientationMargin={0}>
        Special pricing
      </Divider>
      <div className={styles.multipliers}>
        {' '}
        Weekend multiplier
        <Form.Item name="weekendSwitch" valuePropName="checked">
          <Switch
            onChange={(event) => setDisplayWeekendMultiplier(event)}
          ></Switch>
        </Form.Item>
      </div>
      {displayWeekendMultiplier && (
        <Form.Item name="weekendMultiplier" dependencies={['weekendSwitch']}>
          <InputNumber
            style={{
              width: '100%',
            }}
          ></InputNumber>
        </Form.Item>
      )}
      <div className={styles.multipliers}>
        Holiday multiplier
        <Form.Item name="holidaySwitch" valuePropName="checked">
          <Switch
            onChange={(event) => setDisplayHolidayMultiplier(event)}
          ></Switch>
        </Form.Item>
      </div>
      {displayHolidayMultiplier && (
        <Form.Item name="holidayMultiplier" dependencies={['holidaySwitch']}>
          <InputNumber
            style={{
              width: '100%',
            }}
          ></InputNumber>
        </Form.Item>
      )}
      <div className={styles.buttons}>
        <Form.Item name="submit">
          <Button type="primary" text="Submit" />
        </Form.Item>
        <Form.Item>
          <Button type="secondary" text="Cancel" action={cancelAction} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default AvailabilityForm;
