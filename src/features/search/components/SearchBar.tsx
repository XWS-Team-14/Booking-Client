import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { disabledDateRangePicker } from '@/common/utils/dateHelper';
import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, DatePicker, Input, InputNumber } from 'antd';

import { getAllAmenities } from '@/features/accommodation/services/accommodation.service';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
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
  const [amenities, setAmenities] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(0);

  useEffect(() => {
    getAllAmenities()
      .then((response) => setAmenities(response.data.amenity))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  function sendDataToParent() {
    onDataChanged(searchParams);
    setFiltersOpen(0);
  }

  function changeCountry(value: string) {
    setSearchParams({
      country: value,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guests: searchParams?.guests,
      price_min: searchParams?.price_min ? searchParams.price_min : 0,
      price_max: searchParams?.price_max ? searchParams.price_max : -1,
      must_be_featured_host: searchParams?.must_be_featured_host
        ? searchParams.must_be_featured_host
        : false,
      amenities: searchParams?.amenities ? searchParams?.amenities : [],
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
      price_min: searchParams?.price_min ? searchParams.price_min : 0,
      price_max: searchParams?.price_max ? searchParams.price_max : -1,
      must_be_featured_host: searchParams?.must_be_featured_host
        ? searchParams.must_be_featured_host
        : false,
      amenities: searchParams?.amenities ? searchParams?.amenities : [],
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
      price_min: searchParams?.price_min ? searchParams.price_min : 0,
      price_max: searchParams?.price_max ? searchParams.price_max : -1,
      must_be_featured_host: searchParams?.must_be_featured_host
        ? searchParams.must_be_featured_host
        : false,
      amenities: searchParams?.amenities ? searchParams?.amenities : [],
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
      price_min: searchParams?.price_min ? searchParams.price_min : 0,
      price_max: searchParams?.price_max ? searchParams.price_max : -1,
      must_be_featured_host: searchParams?.must_be_featured_host
        ? searchParams.must_be_featured_host
        : false,
      amenities: searchParams?.amenities ? searchParams?.amenities : [],
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
      price_min: searchParams?.price_min ? searchParams.price_min : 0,
      price_max: searchParams?.price_max ? searchParams.price_max : -1,
      must_be_featured_host: searchParams?.must_be_featured_host
        ? searchParams.must_be_featured_host
        : false,
      amenities: searchParams?.amenities ? searchParams?.amenities : [],
    });
  }

  const changeMinPrice = (value: number | null) => {
    setSearchParams({
      country: searchParams?.country,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guests: searchParams?.guests ? searchParams.guests : 0,
      price_min: value ? value : 0,
      price_max: searchParams?.price_max ? searchParams.price_max : -1,
      must_be_featured_host: searchParams?.must_be_featured_host
        ? searchParams.must_be_featured_host
        : false,
      amenities: searchParams?.amenities ? searchParams?.amenities : [],
    });
  };

  const changeMaxPrice = (value: number | null) => {
    setSearchParams({
      country: searchParams?.country,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guests: searchParams?.guests ? searchParams.guests : 0,
      price_min: searchParams?.price_min ? searchParams.price_min : 0,
      price_max: value ? value : -1,
      must_be_featured_host: searchParams?.must_be_featured_host
        ? searchParams.must_be_featured_host
        : false,
      amenities: searchParams?.amenities ? searchParams?.amenities : [],
    });
  };

  const changeFeatured = (value: boolean | undefined) => {
    setSearchParams({
      country: searchParams?.country,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guests: searchParams?.guests ? searchParams.guests : 0,
      price_min: searchParams?.price_min ? searchParams.price_min : 0,
      price_max: searchParams?.price_max ? searchParams.price_max : -1,
      must_be_featured_host: value !== undefined ? value : false,
      amenities: searchParams?.amenities ? searchParams?.amenities : [],
    });
  };

  const addToAmenities = (e: CheckboxChangeEvent, amenity: string) => {
    const newAmenities =
      searchParams?.amenities === undefined ? [] : searchParams.amenities;
    if (e.target.checked) {
      newAmenities.push(amenity);
    } else {
      const index = newAmenities.indexOf(amenity);
      if (index > -1) {
        newAmenities.splice(index, 1);
      }
    }
    setSearchParams({
      country: searchParams?.country,
      city: searchParams?.city,
      address: searchParams?.address,
      start_date: searchParams?.start_date,
      end_date: searchParams?.end_date,
      guests: searchParams?.guests ? searchParams.guests : 0,
      price_min: searchParams?.price_min ? searchParams.price_min : 0,
      price_max: searchParams?.price_max ? searchParams.price_max : -1,
      must_be_featured_host: searchParams?.must_be_featured_host
        ? searchParams.must_be_featured_host
        : false,
      amenities: newAmenities,
    });
    console.log(searchParams);
  };

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
        activeKey={filtersOpen}
        accordion
        onChange={() => setFiltersOpen(Math.abs(filtersOpen - 1))}
        ghost
        style={{ width: '100%', maxWidth: '1240px' }}
      >
        <CollapsePanel key={'1'} header="Filters" style={{ width: '100%' }}>
          <div className={styles.filters}>
            <div className={styles.filters__priceRange}>
              <b>Price range</b>
              <div className={styles.filters__priceRange__inputs}>
                <InputNumber
                  prefix="€"
                  placeholder="Min"
                  onChange={(e) => changeMinPrice(e)}
                ></InputNumber>
                –
                <InputNumber
                  prefix="€"
                  placeholder="Max"
                  onChange={(e) => changeMaxPrice(e)}
                ></InputNumber>
              </div>
            </div>
            <div className={styles.filters__amenities}>
              <b>Amenities</b>
              <div className={styles.filters__amenities__items}>
                {amenities?.map((amenity: string) => (
                  <Checkbox
                    onChange={(e) => addToAmenities(e, amenity)}
                    key={amenity}
                  >
                    {amenity}
                  </Checkbox>
                ))}
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
