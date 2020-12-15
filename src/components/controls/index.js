import React from 'react';
import Button from './buttons';
import { LogContext } from '../../lib/contexts/LogContext';

function checkIfLoggedIn(arr) {
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

const Controls = () => {
  const { logs, setLogs } = React.useContext(LogContext);
  const [isLoggedIn, setIsLoggedIn] = React.useState(checkIfLoggedIn(logs));

  const clearLogs = () => {
    const userPrompt = prompt('Type "ok" to clear logs', 'no');
    if (userPrompt?.toLowerCase() === 'ok') {
      localStorage.clear();
      setLogs([]);
      setIsLoggedIn(false);
    }
  };

  const handleClick = () => {
    const dateTime = new Date();
    const date = {
      date: dateTime.getDate(),
      month: dateTime.getMonth(),
      year: dateTime.getFullYear(),
    };
    const time = dateTime.toLocaleString();
    const lastLog = logs[logs.length - 1];

    if (
      date.year === lastLog?.date.year &&
      date.month === lastLog?.date.month &&
      date.date === lastLog?.date.date
    ) {
      const obj = {
        date,
        login: !isLoggedIn ? [...lastLog.login, time] : lastLog.login,
        logout: isLoggedIn
          ? !lastLog.logout[0]
            ? [time]
            : [...lastLog.logout, time]
          : lastLog.logout,
      };
      const logsCopy = [...logs];
      logsCopy[logsCopy.length - 1] = obj;
      setLogs(logsCopy);
    } else {
      setLogs([
        ...logs,
        {
          date,
          login: [!isLoggedIn ? time : ''],
          logout: [isLoggedIn ? time : ''],
        },
      ]);
    }

    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <div>You are {isLoggedIn ? 'Logged In' : 'Logged Out'}</div>
      <Button text={isLoggedIn ? 'Logout' : 'Login'} func={handleClick} />
      {logs.length !== 0 && <Button text="Clear Logs" func={clearLogs} />}
    </>
  );
};

export default Controls;
