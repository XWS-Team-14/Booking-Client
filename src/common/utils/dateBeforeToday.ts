import dayjs, { Dayjs } from 'dayjs';

export const isDateBeforeToday = (current: Dayjs) =>
  current < dayjs().endOf('day').add(-1, 'day');
