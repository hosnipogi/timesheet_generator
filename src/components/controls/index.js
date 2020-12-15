import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from './buttons';
import { LogContext } from '../../lib/contexts/LogContext';
import {
  checkIfLoggedIn,
  dateTime,
  date,
  generate12HourTime,
  generateLink,
  getLastDayOfMonth,
} from './utils';
import Months from '../../lib/config/monthKeys';

const Controls = () => {
  const { logs, setLogs } = React.useContext(LogContext);
  const [isLoggedIn, setIsLoggedIn] = React.useState(checkIfLoggedIn(logs));
  const params = useParams();

  const sync = () => {
    alert(JSON.stringify(logs));
  };

  const clearLogs = () => {
    const userPrompt = prompt('Type "ok" to clear logs', 'no');
    if (userPrompt?.toLowerCase() === 'ok') {
      localStorage.clear();
      setLogs([]);
      setIsLoggedIn(false);
    }
  };

  const handleClick = () => {
    const time = generate12HourTime(dateTime);
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
    <section>
      <p>You are {isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
      <Button text={isLoggedIn ? 'Logout' : 'Login'} func={handleClick} />
      {logs.length !== 0 && (
        <>
          <Button text="Clear Logs" func={clearLogs} />
          <Button text="Sync to server" func={sync} />
          <Link style={{ display: 'block' }} to={generateLink(1, params)}>
            Generate 1-15 cutoff
          </Link>
          {logs[logs.length - 1]?.date >= 16 && (
            <Link style={{ display: 'block' }} to={generateLink(2, params)}>
              Generate 16-
              {getLastDayOfMonth(
                parseInt(params.year) || date.year,
                Months.indexOf(params.month) || date.month
              )}
              &nbsp;cutoff
            </Link>
          )}
        </>
      )}
    </section>
  );
};

export default Controls;
