import Button from '@/common/components/button/Button';
import { FileImageOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Radio,
  Tag,
  Tooltip,
} from 'antd';
import { useRouter } from 'next/dist/client/router';
import { ToastContainer, toast } from 'react-toastify';

import { selectAuthState, selectRole } from '@/common/store/slices/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/accommodation.module.scss';

import Loading from '@/common/components/loading/Loading';
import Dragger from 'antd/lib/upload/Dragger';
import { create } from '../services/accommodation.service';
import AccommodationFormDto from '../types/AccommodationFormDto';

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

const CreateAccommodationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const authState = useSelector(selectAuthState);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (authState === null) {
      console.log('waiting...');
    } else if (authState && role === 'host') {
      setLoading(false);
    } else {
      router.push('/');
    }
  }, [role, authState]);

  const onFinish = (values: AccommodationFormDto) => {
    let formData = new FormData();
    let feat = '';
    for (let item of values.features) {
      feat += item + ',';
    }
    feat = feat.slice(0, feat.length - 1);

    formData.append('name', values.name);
    formData.append('country', values.country);
    formData.append('city', values.city);
    formData.append('address', values.address);
    formData.append('features', feat);
    formData.append('min_guests', values.min_guests);
    formData.append('max_guests', values.max_guests);
    formData.append('auto_accept_flag', values.auto_accept_flag);

    for (let item of values.files) {
      formData.append('files', item.originFileObj!);
    }

    create(formData)
      .then((res) => {
        toast.success('Success');
        console.log(res);
        router.push('/');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: 'top',
    marginTop: '0.5rem',
  };

  const tagPlusStyle: React.CSSProperties = {
    borderStyle: 'dashed',
    marginTop: '0.5rem',
  };

  const checkAmenities = () => {
    if (tags.length >= 2) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error('It is required to add at least two amenities.')
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <ToastContainer />
        <h1 className={styles.title}>Add an accommodation</h1>
        <Form
          className={styles.loginForm}
          onFinish={onFinish}
          encType="multipart/form-data"
          autoComplete="off"
        >
          <Divider>Basic information</Divider>
          <Form.Item
            hasFeedback
            name="name"
            rules={[{ required: true, message: 'Title is required.' }]}
          >
            <Input className={styles.inputField} placeholder="Title" />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="address"
            rules={[{ required: true, message: 'Address is required.' }]}
          >
            <Input className={styles.inputField} placeholder="Address" />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="city"
            rules={[{ required: true, message: 'City is required.' }]}
          >
            <Input className={styles.inputField} placeholder="City" />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="country"
            rules={[{ required: true, message: 'Country is required.' }]}
          >
            <Input className={styles.inputField} placeholder="Country" />
          </Form.Item>
          <Divider>Reservation settings</Divider>
          <Form.Item
            hasFeedback
            name="min_guests"
            rules={[
              {
                required: true,
                message: 'Minimum number of guests is required.',
              },
            ]}
          >
            <InputNumber
              className={styles.inputField}
              style={{ width: '100%' }}
              placeholder="Minimum number of guests"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="max_guests"
            rules={[
              {
                required: true,
                message: 'Maximum number of guests is required.',
              },
            ]}
          >
            <InputNumber
              className={styles.inputField}
              style={{ width: '100%' }}
              placeholder="Maximum number of guests"
            />
          </Form.Item>
          <Form.Item
            label="Automatically approve of pending reservation requests?"
            labelCol={{ span: 24 }}
            hasFeedback
            name="auto_accept_flag"
            rules={[
              { required: true, message: 'Auto accept flag is required.' },
            ]}
          >
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No </Radio>
            </Radio.Group>
          </Form.Item>

          <Divider>Amenities</Divider>
          <Form.Item name="amenities" rules={[{ validator: checkAmenities }]}>
            {tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  closable
                  style={{ userSelect: 'none', marginTop: '0.5rem' }}
                  onClose={() => handleClose(tag)}
                >
                  <span
                    onDoubleClick={(e) => {
                      if (index !== 0) {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={tagInputStyle}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag style={tagPlusStyle} onClick={showInput}>
                <PlusOutlined /> New amenity
              </Tag>
            )}
          </Form.Item>

          <Divider>Photos</Divider>
          <Form.Item
            name="files"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Dragger multiple accept=".png, .gif, .jpg" listType="picture-card">
              <div>
                <FileImageOutlined style={{ fontSize: '24px' }} />
                <div>Upload photos of the accommodation</div>
              </div>
            </Dragger>
          </Form.Item>
          <Form.Item className={styles.submit}>
            <Button type="primary" text="Finish" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default CreateAccommodationForm;
