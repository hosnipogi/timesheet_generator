import getLastDayOfMonth from '../../lib/utils/getLastDayOfMonth';
import Months from '../../lib/config/monthKeys';

export const generateRows = ({ array, cutoff, date }) => {
  let obj = {};
  let arr = [];

  function cut(a, b) {
    for (let x = a; x <= b; x++) {
      obj.date = x;
      arr.push(obj);
      obj = {};
    }
  }

  if (cutoff === 1) {
    cut(1, 15);
  } else if (cutoff === 2) {
    cut(16, getLastDayOfMonth(date.year, Months.indexOf(date.month)));
  }

  arr = arr.map((i, index) => {
    const [filtered] = array.filter((r) => r.date.date === i.date);
    return (
      filtered || {
        date: { date: cutoff === 2 ? index + 16 : index + 1 },
        login: [],
        logout: [],
      }
    );
  });

  return arr;
};

export { default as filterMonth } from '../../lib/utils/filterMonth';
export { getLastDayOfMonth };
