const filterMonth = (logs, yr, mon) => {
  const year = logs.filter(({ date: { year } }) => year === parseInt(yr));
  const month = year.filter(({ date: { month } }) => month === parseInt(mon));

  return month;
};

export default filterMonth;
