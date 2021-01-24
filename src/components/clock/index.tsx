import React from 'react';

const getTime = () => new Date().toLocaleString();

const Clock = () => {
  const [time, setTime] = React.useState(getTime());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{time}</div>;
};

export default Clock;
