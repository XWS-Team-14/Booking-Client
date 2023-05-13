import Button from '@/common/components/button/Button';
import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, InputNumber, Select } from 'antd';
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

  /*function changeStartPoint(value: string) {
    let temp: SearchParams = {
      start_point: value,
      end_point: searchParams?.end_point,
      date: searchParams?.date,
      number_of_tickets: searchParams?.number_of_tickets,
    };
    setSearchParams(temp);
  }
  function changeEndPoint(value: string) {
    let temp: SearchParams = {
      start_point: searchParams?.start_point,
      end_point: value,
      date: searchParams?.date,
      number_of_tickets: searchParams?.number_of_tickets,
    };
    setSearchParams(temp);
  }
  const changeDate: DatePickerProps['onChange'] = (date, value) => {
    console.log(date, value);
    let temp: SearchParams = {
      start_point: searchParams?.start_point,
      end_point: searchParams?.end_point,
      date: value ? dayjs(value).format('YYYY-MM-DD') : undefined,
      number_of_tickets: searchParams?.number_of_tickets,
    };
    setSearchParams(temp);
  };
  function changeNumberOfTickets(value: number | null) {
    setSearchParams({
      start_point: searchParams?.start_point,
      end_point: searchParams?.end_point,
      date: searchParams?.date,
      number_of_tickets: value ? value : 1,
    });
  }*/

  return (
    <div className={styles.searchBarContainer}>
      <Select
        showSearch
        allowClear
        placeholder="Origin"
        optionFilterProp="children"
        bordered={false}
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          height: '54.4px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
        }}
        options={placeOptions}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      <Select
        showSearch
        allowClear
        placeholder="Destination"
        optionFilterProp="children"
        bordered={false}
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '0.7rem',
          height: '54.4px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
        }}
        options={placeOptions}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      <DatePicker
        allowClear={true}
        placeholder="Date of departure"
        format="dddd, MMMM DD, YYYY"
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderWidth: '0',
          borderRadius: '0',
          height: '54.4px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
        }}
      />
      <InputNumber
        min={1}
        max={100}
        placeholder="Number of tickets"
        bordered={false}
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '0.7rem',
          borderRadius: '0',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
          height: '54.4px',
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
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 10px -10px',
        }}
      >
        <SearchOutlined style={{ fontSize: '24px' }} />
      </Button>
    </div>
  );
};

export default SearchBar;
