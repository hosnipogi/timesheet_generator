import getLastDayOfMonth from '../../lib/utils/getLastDayOfMonth';
import { IDate } from '../../lib/config/date';

type TGenerateRows = (props: {
  array: IDate[];
  cutoff: number;
  date: {
    year: number;
    month: number;
  };
}) => any[];

type CDate = {
  date: {
    date: number;
  };
};

type CArr = CDate[];

export const generateRows: TGenerateRows = ({ array, cutoff, date }) => {
  let obj: CDate = { date: { date: 0 } };
  let arr: CArr = [];

  function cut(a: number, b: number) {
    for (let x = a; x <= b; x++) {
      obj.date.date = x;
      arr.push(obj);
      obj = { date: { date: 0 } };
    }
  }

  if (cutoff === 1) {
    cut(1, 15);
  } else if (cutoff === 2) {
    cut(16, getLastDayOfMonth(date.year, date.month));
  }

  arr = arr.map((i, index) => {
    const [filtered] = array.filter((r) => r.date.date === i.date.date);
    return (
      filtered || {
        date: { date: cutoff === 2 ? index + 16 : index + 1 },
        login: [],
        logout: [],
        remarks: '',
      }
    );
  });

  return arr;
};

export { default as filterMonth } from '../../lib/utils/filterMonth';
export { getLastDayOfMonth };
