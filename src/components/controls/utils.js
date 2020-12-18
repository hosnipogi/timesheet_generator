import Months from '../../lib/config/monthKeys';

const dateTime = () => new Date();
const date = () => {
  const d = dateTime();
  return {
    date: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear(),
  };
};

export { dateTime, date };

export function checkIfLoggedIn(arr) {
  if (!arr[0].login.length) return false;

  const lastIndex = arr.length - 1;
  const logoutLastIndexLength = arr[lastIndex].logout.length;
  const loginLastIndexLength = arr[lastIndex].login.length;
  const logoutLastIndex = arr[lastIndex].logout[logoutLastIndexLength - 1];

  if (logoutLastIndex && logoutLastIndexLength === loginLastIndexLength) {
    return false;
  } else {
    return true;
  }
}

export function generate12HourTime() {
  const d = dateTime();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export function generateLink(cutoff, params) {
  const d = date();
  return params.year
    ? `/dtr/${params.year}/${params.month}/${cutoff}`
    : `/dtr/${d.year}/${Months[d.month]}/${cutoff}`;
}

export { default as getLastDayOfMonth } from '../../lib/utils/getLastDayOfMonth';
