import { IDate } from './date';

const date = new Date();
const shape: IDate = {
  date: {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  },
  login: [],
  logout: [],
  remarks: '',
};

export default shape;
