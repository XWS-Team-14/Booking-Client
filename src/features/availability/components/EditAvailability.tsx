import { ToastContainer, toast } from 'react-toastify';
import styles from '../styles/availability.module.scss';
import { Form, Input, Select, DatePicker, Checkbox, Card } from 'antd';
import Button from '@/common/components/button/Button';
import { useEffect, useState } from 'react';
import AvailabilityDto from '../types/availabilityDto';
import DateInterval from '../types/dateInterval';
import { GetAllForUser } from '../services/availability.service';
const { RangePicker } = DatePicker;
const EditAvailability = () =>{
    const [form] = Form.useForm();
    const [start_date, setStartDate] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("err");
    const [end_date, setEndDate] = useState<string>("");
    const [enableWeekendPrice, setEnableWeekend]= useState<Boolean>(false);
    const [enableHolidayPrice, setEnableHoliday]= useState<Boolean>(false);
    const [editDisabled, setEditDisabled]= useState<Boolean>(true);
    const [storedAvailability, settoredAvailability] = useState<AvailabilityDto>();
    const [allAvailabilities, setAllAvailabilities] = useState<Array<AvailabilityDto>>();
    useEffect(() => {
        const fetchUserEmail =async () => {
            try{
                //const response = await getUserEmail(userEmail);
                //setUserEmail(response.data);
              }
              catch (error){
                console.error(error);
              }
        };
        fetchUserEmail();
        const fetchData = async () => {
          try{
            //const response = await GetAllForUser(userEmail);
            //setAllAvailabilities(response.data);
          }
          catch (error){
            console.error(error);
          }
        };
        fetchData();
      }, []);
    
    
    const onFinish = ()=>{
        var dto : AvailabilityDto = {
            availability_id: '',
            accomodation_id: '',
            interval:  {date_start: start_date, date_end : end_date},
            pricing_type: '',
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
        //save
    };
    const onFinishFailed = ()=>{

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
    const prepareForEdit = (stored : AvailabilityDto) => {
        if(stored.occupied_intervals.length === 0){
            setEditDisabled(true);
            form.setFieldValue('availability_id', stored.availability_id);
            //etc
        }
        else{
            setEditDisabled(false);
            toast("Your accommodation has been booked for selected interval, it cannot be edited or deleted!");
        }
    }
    return (
        <section className={styles.pageWrapper}>
            <div className={styles.wrapper}>
            <div className={styles.cardHolder}>
          {allAvailabilities?.map(item => (
            <Card
              key={item.availability_id}
              bordered={true}
              className={styles.card}
              onClick={() => prepareForEdit(item)}
              >
                <p>{item.availability_id}</p>
            </Card>
          ))}
        </div>
            </div>
            <div className={styles.wrapper}>
                <ToastContainer/>
                <h1>Edit availability</h1>
                <Form
                form={form}
                className={styles.loginForm}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                disabled={editDisabled.valueOf()}
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
                        <Select.Option value="demo">Demo</Select.Option>
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
                    <Button type="primary" text="Update" style={{ width: '100%' }} />
                </Form.Item>
                </Form>
            </div>
        </section>
    );
}
export default EditAvailability;