import { ToastContainer, toast } from 'react-toastify';
import type { Dayjs } from 'dayjs';
import styles from '../styles/availability.module.scss';
import { Form, Input, Select, DatePicker, Checkbox,DatePickerProps } from 'antd';
import Button from '@/common/components/button/Button';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import AvailabilityDto from '../types/availabilityDto';
import DateInterval from '../types/dateInterval';
import {createAvailability }from '../services/availability.service'
const { RangePicker } = DatePicker;

const CreateAvailability = () =>{
    const [form] = Form.useForm();
    //const start_date = fieldsValue['date-picker'].format('YYYY-MM-DD'),
    const [start_date, setStartDate] = useState<string>("");
    const [end_date, setEndDate] = useState<string>("");
    const [enableWeekendPrice, setEnableWeekend]= useState<Boolean>(false);
    const [enableHolidayPrice, setEnableHoliday]= useState<Boolean>(false);
    const router = useRouter();
    //temp testing purposes
    const [acomodationIds, setacomodationIds] = useState<Array<string>>([
        "c645b089-4bf4-439d-ad0f-22c5d8919203",
        "26d11df5-1aeb-4e53-81ef-3144e2dcef5f"
    ]);    

    const onFinish = ()=>{
        var dto : AvailabilityDto = {
            availability_id: "d721aefc-23df-4dce-a7f9-30e2b671a2c5",
            accomodation_id: form.getFieldValue('accomodation'),
            interval:  {date_start: start_date, date_end : end_date},
            pricing_type: form.getFieldValue('pricing_type'),
            base_price: form.getFieldValue('base_price'),
            occupied_intervals: [],
            special_pricing: []
        }
        if(enableWeekendPrice) {
            dto.special_pricing.push({title:'Weekend',pricing_markup:form.getFieldValue('weekend_mul')})
        }
        if(enableHolidayPrice) {
            dto.special_pricing.push({title:'Holiday',pricing_markup:form.getFieldValue('holiday_mul')})
        }
        console.log(dto);
        createAvailability(dto)
        .then((res) => {
            toast.success(res.data);
            router.push('/editAvailability');
        })
        .catch((err) =>{
            toast.error(err);
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        errorInfo.errorFields.map((error: any) => {
          toast.error(error.errors[0]);
        });
      };

    const onRangeChange = (dates :any, dateStrings :[string, string]) => {
        console.log(dates, dateStrings);
        setStartDate(dateStrings[0]);
        setEndDate(dateStrings[1]);
      };

    const flipWeekendFlag = ( )=>{
        setEnableWeekend(!enableWeekendPrice);
    }

    const flipHolidayFlag = ( )=>{
        setEnableHoliday(!enableHolidayPrice);
    }

    return (
        <section className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                <ToastContainer/>
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
                    <Select
                    placeholder="Acomodation"
                    >
                        {acomodationIds?.map(item => ( //temp
                            <Select.Option
                            value={item}
                            >
                                {item}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="pricing_type"
                    rules={[{ required: true, message: 'PricingType is required.' }]}
                    >
                    <Select
                        placeholder="Pricing type"
                    >
                        <Select.Option value="Per_accomodation_unit">Per unit</Select.Option>
                        <Select.Option value="Per_guest">Per guest</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    hasFeedback
                    name="base_price"
                    rules={[{ required: true, message: 'Base price is required and its a number.' },]}
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
                    rules={[{ required: enableWeekendPrice.valueOf(), message: 'Weekend multiplyer is required and its a number' },]}
                >
                    <Input
                    className={styles.inputField}
                    placeholder="Weekend multiplyer"
                    type="number"
                    step="0.01"
                    disabled = {!enableWeekendPrice}
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
                    rules={[{ required: enableHolidayPrice.valueOf(), message: 'Holiday multiplyer is required and its a number' },]}
                >
                    <Input
                    className={styles.inputField}
                    placeholder="Holiday multiplyer"
                    type="number"
                    step="0.01"
                    disabled = {!enableHolidayPrice}
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
}

export default CreateAvailability;