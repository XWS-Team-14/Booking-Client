import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { disabledDateRangePicker } from '@/common/utils/dateHelper';
import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, DatePicker, Input, InputNumber } from 'antd';

import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { RangePickerProps } from 'antd/lib/date-picker';
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
      guests: searchParams?.guests,
    });
  }
  function changeCity(value: string) {
    setSearchParams({
      country: searchParams?.country,
      city: value,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guests: searchParams?.guests,
    });
  }
  function changeAddress(value: string) {
    setSearchParams({
      country: searchParams?.country,
      city: searchParams?.city,
      address: value,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guests: searchParams?.guests,
    });
  }
  const changeDate: RangePickerProps['onChange'] = (date, value) => {
    let startDate = '';
    let endDate = '';
    if (date) {
      startDate = date[0] ? date[0].format('YYYY-MM-DD').toString() : '';
      endDate = date[1] ? date[1]?.format('YYYY-MM-DD').toString() : '';
    }
    setSearchParams({
      country: searchParams?.country,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: startDate,
      end_date: endDate,
      guests: searchParams?.guests,
    });
  };
  function changeGuests(value: number | null) {
    setSearchParams({
      country: searchParams?.country,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guests: value ? value : 0,
    });
  }

  return loading ? (
    <Loading />
  ) : (
    <>
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
          placeholder={['Check-in date', 'Checkout date']}
          disabledDate={disabledDateRangePicker}
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
          min={0}
          max={15}
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
      <Collapse
        defaultActiveKey={['1']}
        ghost
        bordered={false}
        style={{ width: '100%', maxWidth: '1240px' }}
      >
        <CollapsePanel key={'1'} header="Filters" style={{ width: '100%' }}>
          <div className={styles.filters}>
            <div className={styles.filters__priceRange}>
              <Checkbox>
                <b>Price range</b>
              </Checkbox>
              <div className={styles.filters__priceRange__inputs}>
                <InputNumber prefix="€" placeholder="Min"></InputNumber>–
                <InputNumber prefix="€" placeholder="Max"></InputNumber>
              </div>
            </div>
            <div className={styles.filters__amenities}>
              <b>Amenities</b>
              <div className={styles.filters__amenities__items}>
                <Checkbox>Wi-Fi</Checkbox>
                <Checkbox>Flat-screen TV</Checkbox>
              </div>
            </div>
            <div>
              <Checkbox>
                <b>Featured host</b>
              </Checkbox>
            </div>
          </div>
        </CollapsePanel>
      </Collapse>
    </>
  );
};

export default SearchBar;
