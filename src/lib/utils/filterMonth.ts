import { IDate } from '../config/date';

const filterMonth = (logs: IDate[], yr: number, mon: number) => {
  console.log({ mon });
  const year = logs.filter(({ date: { year } }) => year === yr);
  const month = year
    .filter(({ date: { month } }) => month === mon)
    .sort((a, b) => a.date.date - b.date.date);

  return month;
};

export default filterMonth;
