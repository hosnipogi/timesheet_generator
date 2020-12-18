const date = new Date();

const shape = {
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
