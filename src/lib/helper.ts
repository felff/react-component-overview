import dayjs from 'dayjs';

export const CURRENT_YEAR = dayjs().year();

export const CURRENT_MONTH = dayjs().month() + 1;

export const getMonthFirstDay = (
  month = CURRENT_MONTH,
  year = CURRENT_YEAR,
) => {
  return dayjs(`${year}-${month}-01`).day(); // 獲取當月第一天是星期幾
};

export const getMonthLastDay = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
  return dayjs(`${year}-${month}-${getMonthLastDate(month, year)}`).day(); // 獲取當月最後一天是星期幾
};

export const getMonthLastDate = (
  month = CURRENT_MONTH,
  year = CURRENT_YEAR,
) => {
  return dayjs(`${year}-${month}`).daysInMonth(); // 取得當月總天數
};
