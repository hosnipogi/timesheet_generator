import getLastDayOfMonth from '../../lib/utils/getLastDayOfMonth';
import Months from '../../lib/config/monthKeys';

export const generateRows = ({ array, cutoff, date }) => {
  let obj = {};
  let arr = [];
  const cutoffInt = parseInt(cutoff);

  function cut(a, b) {
    for (let x = a; x <= b; x++) {
      obj.date = x;
      arr.push(obj);
      obj = {};
    }
  }

  if (cutoffInt === 1) {
    cut(1, 15);
  } else if (cutoffInt === 2) {
    cut(16, getLastDayOfMonth(date.year, Months.indexOf(date.month)));
  }

  arr = arr.map((i, index) => {
    const [filtered] = array.filter((r) => r.date.date === i.date);
    return (
      filtered || {
        date: { date: cutoffInt === 2 ? index + 16 : index + 1 },
        login: [],
        logout: [],
      }
    );
  });

  // TODO Sort the array

  return arr;
};

export { default as filterMonth } from '../../lib/utils/filterMonth';
