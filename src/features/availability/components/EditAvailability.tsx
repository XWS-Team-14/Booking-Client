import { ToastContainer, toast } from 'react-toastify';
import styles from '../styles/availability.module.scss';
import { Form, Input, Select, DatePicker, Checkbox, Card } from 'antd';
import Button from '@/common/components/button/Button';
import { useEffect, useState } from 'react';
import AvailabilityDto from '../types/availabilityDto';
import DateInterval from '../types/dateInterval';
import { getAllForUser, updateAvailability,deleteAvailability } from '../services/availability.service';
import { useRouter } from 'next/dist/client/router';
import SpecialPricing from '../types/specialPricing';

const EditAvailability = () =>{
    //temp testing purposes
    const acomodationIds : string[]= [
        "c645b089-4bf4-439d-ad0f-22c5d8919203",
        "26d11df5-1aeb-4e53-81ef-3144e2dcef5f"
    ]
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const [start_date, setStartDate] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("err");
    const [end_date, setEndDate] = useState<string>("");
    const [enableWeekendPrice, setEnableWeekend]= useState<Boolean>(false);
    const [enableHolidayPrice, setEnableHoliday]= useState<Boolean>(false);
    const [editDisabled, setEditDisabled]= useState<Boolean>(true);
    const [storedAvailability, settoredAvailability] = useState<AvailabilityDto>();
    const [allAvailabilities, setAllAvailabilities] = useState<Array<AvailabilityDto>>();
    const router = useRouter();

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
            const response = await getAllForUser("testing");
            setAllAvailabilities(response.data.items);
          }
          catch (error){
            console.error(error);
          }
        };
        fetchData();
      }, []);
    
    
    const onFinish = ()=>{
        var dto : AvailabilityDto = {
            availability_id: form.getFieldValue('availability_id'),
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
        updateAvailability(dto)
        .then((res) => {
            toast.success(res.data);
        })
        .catch((err) =>{
            toast.error(err);
        })
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
        if(!stored.occupied_intervals){
            setEditDisabled(false);
            setEnableWeekend(false);
            setEnableHoliday(false);
            form.setFieldValue('availability_id', stored.availability_id);
            form.setFieldValue('accomodation', stored.accomodation_id);
            form.setFieldValue('pricing_type', stored.pricing_type);
            form.setFieldValue('base_price', stored.base_price);
            
            if(stored.special_pricing){
                setEnableWeekend(true);
                setEnableHoliday(true);
                if (stored.special_pricing[0].title == "Weekend"){
                    form.setFieldValue('weekend_mul', stored.special_pricing[0].pricing_markup);
                    if(stored.special_pricing[1]) form.setFieldValue('holiday_mul', stored.special_pricing[1].pricing_markup);
                    else form.setFieldValue('holiday_mul', 1);
                }
                else{
                    form.setFieldValue('holiday_mul', stored.special_pricing[0].pricing_markup);
                    if(stored.special_pricing[1]) form.setFieldValue('weekend_mul', stored.special_pricing[1].pricing_markup);
                    else form.setFieldValue('weekend_mul', 1);
                    
                }   
            }   
        }
        else{
            setEditDisabled(true);
            toast.error("Your accommodation has been booked for selected interval, it cannot be edited or deleted!");
        }
    }
    const removeItem = (stored : AvailabilityDto) =>{
        console.log("clicked delete");
        if(!stored.occupied_intervals){
            deleteAvailability(stored.availability_id)
            .then((res) => {
                toast.success(res.data);
                router.push('/editAvailability');
            })
            .catch((err) =>{
                toast.error(err);
            })
        }
        else{
            toast.error("Your accommodation has been booked for selected interval, it cannot be edited or deleted!");
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
                <p>Base price: {item.base_price}</p>
                <p>Date start: {item.interval.date_start}</p>
                <p>Date end: {item.interval.date_end}</p>
                <p>Pricing type: {item.pricing_type}</p>

                <Button action={() => removeItem(item)} type="secondary" text="Delete" style={{ width: '100%' }} disabled={editDisabled.valueOf()}/>
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
                        {acomodationIds?.map(item => ( //temp
                            <Select.Option
                            value={item}
                            >
                                item
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
                    <Button type="primary" text="Update" style={{ width: '100%' }} disabled={editDisabled.valueOf()} />
                </Form.Item>
                </Form>
            </div>
        </section>
    );
}
export default EditAvailability;