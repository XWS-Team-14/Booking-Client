import Button from '@/common/components/button/Button';
import { Availability } from '@/common/types/Availability';
import { checkIfEmptyObjectOrFalsy } from '@/common/utils/checkIfEmptyObjectOrFalsy';
import { isTodayOrBefore } from '@/common/utils/dateHelper';
import { DatePicker, Divider, Form, InputNumber, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  createAvailability,
  updateAvailability,
} from '../services/availability.service';
import styles from '../styles/availability.module.scss';
import {
  getSpecialPricing,
  isSpecialPricingOn,
} from '../utils/isSpecialPricingOn';

interface AvailabilityFormProps {
  availability?: Availability;
  accommodationId: string;
  cancelAction?: () => void;
  submitAction?: () => void;
}

const AvailabilityForm = ({
  availability,
  cancelAction,
  accommodationId,
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

  const [mode, setMode] = useState<'create' | 'edit'>();
  const router = useRouter();
  const handleFinish = () => {
    const start = form
      .getFieldValue('dates')[0]
      .format('YYYY-MM-DD')
      .toString();
    const end = form.getFieldValue('dates')[1].format('YYYY-MM-DD').toString();
    const specialPricing = [];
    if (form.getFieldValue('weekendSwitch')) {
      specialPricing.push({
        title: 'Weekend',
        pricing_markup: form.getFieldValue('weekendMultiplier'),
      });
    }
    if (form.getFieldValue('holidaySwitch')) {
      specialPricing.push({
        title: 'Holiday',
        pricing_markup: form.getFieldValue('holidayMultiplier'),
      });
    }
    const pricingType = form.getFieldValue('pricingStrategy').value
      ? form.getFieldValue('pricingStrategy').value
      : form.getFieldValue('pricingStrategy');

    const price = form.getFieldValue('basePrice');

    if (mode === 'create') {
      if (!!start && !!end && pricingType) {
        const dto = {
          availability_id: '',
          accomodation_id: accommodationId,
          interval: {
            date_start: start,
            date_end: end,
          },
          pricing_type: pricingType,
          special_pricing: specialPricing,
          base_price: price,
          occupied_intervals: [],
        };
        createAvailability(dto)
          .then((res) => {
            console.log(res);
            router.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      const dto = {
        availability_id: availability?.availability_id,
        accomodation_id: accommodationId,
        interval: {
          date_start: start,
          date_end: end,
        },
        pricing_type: pricingType,
        special_pricing: specialPricing,
        base_price: price,
        occupied_intervals: [],
      };
      updateAvailability(dto)
        .then((res) => {
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setMode(checkIfEmptyObjectOrFalsy(availability) ? 'create' : 'edit');
  }, [mode]);

  const initialValues = () => {
    if (!!availability === false || checkIfEmptyObjectOrFalsy(availability))
      return [];
    if (availability && !checkIfEmptyObjectOrFalsy(availability)) {
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
        weekendMultiplier:
          !!getSpecialPricing('Weekend', availability) !== false
            ? getSpecialPricing('Weekend', availability).pricing_markup
            : null,
        holidayMultiplier:
          !!getSpecialPricing('Holiday', availability) !== false
            ? getSpecialPricing('Holiday', availability).pricing_markup
            : null,
      };
    } else {
      return [];
    }
  };

  return (
    <Form form={form} initialValues={initialValues()} onFinish={handleFinish}>
      <Divider orientation="left" orientationMargin={0}>
        Dates
      </Divider>
      <Form.Item
        hasFeedback
        name="dates"
        rules={[
          {
            required: mode === 'create',
            message: 'This field is required.',
          },
        ]}
      >
        <DatePicker.RangePicker
          format="dddd, MMMM DD, YYYY"
          allowClear
          disabledDate={isTodayOrBefore}
        />
      </Form.Item>
      <Divider orientation="left" orientationMargin={0}>
        Price
      </Divider>
      <Form.Item
        hasFeedback
        name="basePrice"
        rules={[
          {
            required: mode === 'create',
            message: 'This field is required.',
          },
        ]}
      >
        <InputNumber
          prefix="€"
          placeholder="Base price"
          style={{
            width: '100%',
          }}
        ></InputNumber>
      </Form.Item>
      <Form.Item
        hasFeedback
        name="pricingStrategy"
        valuePropName="value"
        rules={[
          {
            required: mode === 'create',
            message: 'This field is required.',
          },
        ]}
      >
        <Select placeholder="Pricing strategy" optionLabelProp="label">
          <Option value="Per_accomodation_unit" label="Per unit">
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
            min={0}
            step={0.01}
            keyboard
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
            min={0}
            step={0.01}
            keyboard
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
