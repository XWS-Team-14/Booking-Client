import { RangePickerProps } from 'antd/lib/date-picker';
import dayjs from 'dayjs';

export const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current < dayjs().endOf('day').add(-1, 'day');
