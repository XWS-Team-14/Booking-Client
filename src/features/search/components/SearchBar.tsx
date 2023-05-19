import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Input, InputNumber } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from '../styles/search.module.scss';
import { SearchParams } from '../types/SearchParams';
interface SearchBarProps {
  onDataChanged: (newData: SearchParams | undefined) => void;
}

const SearchBar = ({ onDataChanged }: SearchBarProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  function sendDataToParent() {
    onDataChanged(searchParams);
  }

  function changeCountry(value: string) {
    setSearchParams({
      country: value,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guestCount: searchParams?.guestCount,
    });
  }
  function changeCity(value: string) {
    setSearchParams({
      country: searchParams?.country,
      city: value,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guestCount: searchParams?.guestCount,
    });
  }
  function changeAddress(value: string) {
    setSearchParams({
      country: searchParams?.country,
      city: searchParams?.city,
      address: value,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guestCount: searchParams?.guestCount,
    });
  }
  const changeDate: RangePickerProps['onChange'] = (date, value) => {
    if (date !== null) {
      setSearchParams({
        country: searchParams?.country,
        city: searchParams?.city,
        address: searchParams?.address,
        start_date: date[0]?.format('YYYY-MM-DD').toString(),
        end_date: date[1]?.format('YYYY-MM-DD').toString(),
        guestCount: searchParams?.guestCount,
      });
    }
  };
  function changeGuests(value: Number | null) {
    if (value !== null) {
      setSearchParams({
        country: searchParams?.country,
        city: searchParams?.city,
        address: searchParams?.address,
        start_date: searchParams?.start_date,
        end_date: searchParams?.end_date,
        guestCount: value.valueOf(),
      });
    }
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current < dayjs().endOf('day').add(-1, 'day');
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.searchBarContainer}>
      <Input
        allowClear
        placeholder="Country"
        bordered={false}
        style={{
          width: '70%',
          backgroundColor: 'white',
          padding: '1.2rem',
          borderRadius: '0',
          borderBottomLeftRadius: '2rem',
          borderTopLeftRadius: '2rem',
          height: '54.4px',
        }}
        onChange={(e) => {
          changeCountry(e.target.value);
        }}
      />
      <Input
        placeholder="City"
        bordered={false}
        allowClear
        style={{
          width: '70%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderRadius: '0',
          height: '54.4px',
        }}
        onChange={(e) => {
          changeCity(e.target.value);
        }}
      />
      <Input
        placeholder="Address"
        bordered={false}
        allowClear
        style={{
          width: '70%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderRadius: '0',
          height: '54.4px',
        }}
        onChange={(e) => {
          changeAddress(e.target.value);
        }}
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
        }}
        onChange={(e) => {
          changeDate(e, ['YYYY-MM-DD', 'YYYY-MM-DD']);
        }}
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
          height: '54.4px',
        }}
        onChange={(e) => {
          changeGuests(e);
        }}
      />
      <Button
        action={sendDataToParent}
        type="primary"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: '54.4px',
          paddingRight: '2rem',
        }}
      >
        <SearchOutlined style={{ fontSize: '24px' }} />
      </Button>
    </div>
  );
};

export default SearchBar;
