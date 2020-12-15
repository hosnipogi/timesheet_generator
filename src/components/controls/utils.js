import Months from '../../lib/config/monthKeys';

const dateTime = new Date();
const date = {
  date: dateTime.getDate(),
  month: dateTime.getMonth(),
  year: dateTime.getFullYear(),
};

export { dateTime, date };

export function checkIfLoggedIn(arr) {
  if (!arr.length) return false;

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

export function generate12HourTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export function generateLink(cutoff, params) {
  return params.year
    ? `/dtr/${params.year}/${params.month}/${cutoff}`
    : `/dtr/${date.year}/${Months[date.month]}/${cutoff}`;
}

export { default as getLastDayOfMonth } from '../../lib/utils/getLastDayOfMonth';
