export default function getLastDayOfMonth(year: number, month: number) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}
