import Button from '@/common/components/button/Button';
import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, InputNumber, Select, Input } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from '../styles/search.module.scss';
import { SearchParams } from '../types/SearchParams';
import { SelectOptions } from '../types/SelectOptions';
interface SearchBarProps {
  onDataChanged: (newData: SearchParams | undefined) => void;
}

const SearchBar = ({ onDataChanged }: SearchBarProps) => {
  const [placeOptions, setPlaceOptions] = useState<SelectOptions[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>();

  useEffect(() => {
    //fetchPlaces().then((data) => setPlaceOptions(data));
  }, []);

  function sendDataToParent() {
    onDataChanged(searchParams);
  }
  function changeCountry(value: string) {
    console.log(value)
    let temp: SearchParams = {
      country: value,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guestCount: searchParams?.guestCount,
    };
    setSearchParams(temp);
  }
  function changeCity(value: string) {
    console.log(value)
    let temp: SearchParams = {
      country: searchParams?.country,
      city: value,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guestCount: searchParams?.guestCount,
    };
    setSearchParams(temp);
  }
  function changeAddress(value: string) {
    console.log(value)
    let temp: SearchParams = {
      country: searchParams?.country,
      city: searchParams?.city,
      address: value,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guestCount: searchParams?.guestCount,
    };
    setSearchParams(temp);
  }
  const changeDate: RangePickerProps['onChange'] = (date, value) => {
    if (date != null) {
      let temp: SearchParams = {
        country: searchParams?.country,
        city: searchParams?.city,
        address: searchParams?.address,
        start_date: date[0]?.format('YYYY-MM-DD').toString(),
        end_date: date[1]?.format('YYYY-MM-DD').toString(),
        guestCount: searchParams?.guestCount,
      };
      setSearchParams(temp);
    }
  };
  function changeGuests(value: Number | null) {
    console.log(value)
    if (value != null ) {
      let temp: SearchParams = {
        country: searchParams?.country,
        city: searchParams?.city,
        address: searchParams?.address,
        start_date: searchParams?.start_date,
        end_date: searchParams?.end_date,
        guestCount: value.valueOf(),
      };
      setSearchParams(temp);
    }
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current < dayjs().endOf('day').add(-1, 'day');
  };

  return (
    <div className={styles.searchBarContainer}>
      <Input
        placeholder="Country"
        bordered={false}
        style={{
          width: '70%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderRadius: '0',
          borderBottomLeftRadius: '0.7rem',
          borderTopLeftRadius: '0.7rem',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
          height: '54.4px',
        }}
        onChange={(e) => {changeCountry(e.target.value)}}
      />
      <Input
        placeholder="City"
        bordered={false}
        style={{
          width: '70%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderRadius: '0',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
          height: '54.4px',
        }}
        onChange={(e) => {changeCity(e.target.value)}}
      />
      <Input
        placeholder="Address"
        bordered={false}
        style={{
          width: '70%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderRadius: '0',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
          height: '54.4px',
        }}
        onChange={(e) => {changeAddress(e.target.value)}}
      />
      <DatePicker.RangePicker
        format="dddd, MMMM DD, YYYY"
        allowClear
        disabledDate={disabledDate}
        style={{
          width: '130%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderWidth: '0',
          borderRadius: '0',
          height: '54.4px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
        }}
        onChange={(e) => {
          console.log(e)
          changeDate(e, ['YYYY-MM-DD', 'YYYY-MM-DD'])}}
      />

      <InputNumber
        min={Number(1)}
        max={Number(15)}
        placeholder="Number of guests"
        bordered={false}
        style={{
          width: '70%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderRadius: '0',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
          height: '54.4px',
        }}
        onChange={(e) => {changeGuests(e)}}
      />
      <Button
        action={sendDataToParent}
        type="primary"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: '54.4px',
          paddingRight: '2rem',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
        }}
      >
        <SearchOutlined style={{ fontSize: '24px' }} />
      </Button>
    </div>
  );
};

export default SearchBar;
