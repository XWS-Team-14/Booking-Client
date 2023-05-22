import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';

export const disabledDateRangePicker: RangePickerProps['disabledDate'] = (
  current
) => isDateBeforeToday(current);

export const isDateBeforeToday = (current: Dayjs) =>
  current < dayjs().endOf('day').add(-1, 'day');

export const isTodayOrBefore = (current: Dayjs) =>
  current < dayjs().endOf('day');

export const isAccommodationReservable = (
  current: Dayjs,
  accommodationStart: Dayjs,
  accommodationEnd: Dayjs
) => {
  if (isDateBeforeToday(accommodationEnd)) {
    return false;
  }

  if (isDateBeforeToday(accommodationStart)) {
    return isDateBeforeToday(current);
  }
  return current < accommodationStart || current > accommodationEnd;
};

export const calculateDays = (checkInDate?: Dayjs, checkOutDate?: Dayjs) =>
  checkInDate && checkOutDate
    ? Math.abs(checkInDate.diff(checkOutDate, 'days'))
    : 1;
