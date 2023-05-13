import Button from '@/common/components/button/Button';
import {
  HomeOutlined,
  IdcardOutlined,
  MinusCircleOutlined, PlusOutlined,
  UserOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Form, Input, InputNumber, Upload } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { ToastContainer, toast } from 'react-toastify';

import { selectUser } from '@/common/store/slices/authSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/accommodation.module.scss';

import { create } from '../services/accommodation.service';
import AccommodationFormDto from '../types/AccommodationFormDto';
import api from '@/common/utils/axiosInstance';
import { UploadFile } from 'antd/es/upload';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const Accommodation = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [fileData, setFileData] = useState<string>();
  const user = useSelector(selectUser);

  useEffect(() => {
  }, []);

  const onFinish = (values: AccommodationFormDto) => {
    console.log('Success:', values);
    let formData = new FormData();
    var feat = ""
    for(let item of values.features) {
      feat += item + ","
    }
    feat = feat.slice(0,feat.length-1)
      
    formData.append("name", values.name);
    formData.append("country", values.country);
    formData.append("city", values.city);
    formData.append("address", values.address);
    formData.append("features", feat)
    formData.append("min_guests", values.min_guests);
    formData.append("max_guests", values.max_guests);

    for(let item of values.files) {
      formData.append("files", item.originFileObj!); 
    }

    create(formData)
  };

  
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <ToastContainer />
        <h1 className={styles.title}>Create accommodation</h1>
        <Form
          className={styles.loginForm}
          onFinish={onFinish}
          encType="multipart/form-data"
          autoComplete="off"
        >
          <Form.Item
            hasFeedback
            name="name"
            rules={[{ required: true, message: 'Accommodation name is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<IdcardOutlined />}
              placeholder="Accommodation name"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="country"
            rules={[{ required: true, message: 'Country is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<UserOutlined />}
              placeholder="Country"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="city"
            rules={[{ required: true, message: 'City is required' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<HomeOutlined />}
              placeholder="City"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="address"
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<HomeOutlined />}
              placeholder="Address"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="min_guests"
            rules={[{ required: true, message: 'Min guests is required' }]}
          >
            <InputNumber
              className={styles.inputField}
              style={{width: '100%'}}
              prefix={<HomeOutlined />}
              placeholder="Min guests"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="max_guests"
            rules={[{ required: true, message: 'Max guests is required' }]}
          >
            <InputNumber
              className={styles.inputField}
              style={{width: '100%'}}
              prefix={<HomeOutlined />}
              placeholder="Max guests"
            />
          </Form.Item>

          <Form.List
          name="features"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error('At least 2 features'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Features' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input feautre or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Feature" className={styles.inputField}  style={{width: '95%'}}/>
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item className={styles.submit}>
                <Button type={'primary'} 
                action={() => {
                  add();
                }} 
                text='Add features'></Button>
              <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item  name="files" valuePropName="fileList" getValueFromEvent={normFile} style={{marginTop:50}}>
        <Upload 
          accept='.png, .gif, .jpg'
          listType="picture-card"
          >
          <div>
            <UserOutlined />
          </div>
        </Upload>
        </Form.Item>
        <Form.Item className={styles.submit}>
          <Button type="primary" text="Finish" style={{ width: '100%' }} />
        </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Accommodation;
