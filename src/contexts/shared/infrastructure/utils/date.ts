import dayjs from 'dayjs';

export const getStartDayOfDate = (date: Date): dayjs.Dayjs => {
  const currentDate = dayjs(date);
  return currentDate.startOf('day');
};

export const getEndDayOfDate = (date: Date): dayjs.Dayjs => {
  const currentDate = dayjs(date);
  return currentDate.endOf('day');
};

export const getDateBeforeWeek = (): dayjs.Dayjs => {
  let currentDate = dayjs();

  // Subtract 7 days from the current date
  return currentDate.subtract(7, 'day').startOf('day');
};

export const getDateBeforeOneMonth = (): dayjs.Dayjs => {
  let currentDate = dayjs();
  return currentDate.subtract(1, 'month').startOf('day');
};
