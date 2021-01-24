import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from './buttons';
import { LogContext } from '../../lib/contexts/LogContext';
import shape from '../../lib/config/logObjectShape';
import {
  checkIfLoggedIn,
  date,
  generate12HourTime,
  generateLink,
  getLastDayOfMonth,
} from './utils';
import Months from '../../lib/config/monthKeys';
import styled from './controls.module.css';

type ControlProps = {
  currentTable: any[];
};

const Controls = ({ currentTable }: ControlProps) => {
  const { logs, setLogs } = React.useContext(LogContext);
  const [isLoggedIn, setIsLoggedIn] = React.useState(checkIfLoggedIn(logs));
  const params = useParams<{ year: string; month: string }>();
  const sync = () => {
    alert(JSON.stringify(logs));
  };

  const clearLogs = () => {
    const userPrompt = prompt('Type "ok" to clear logs', 'no');
    if (userPrompt?.toLowerCase() === 'ok') {
      localStorage.clear();
      setLogs([shape]);
      setIsLoggedIn(false);
    }
  };

  const handleClick = () => {
    const time = generate12HourTime();
    const lastLog = logs[logs.length - 1];
    const d = date();
    if (
      d.year === lastLog.date.year &&
      d.month === lastLog.date.month &&
      d.date === lastLog.date.date
    ) {
      const obj = {
        date: d,
        login: !isLoggedIn ? [...lastLog.login, time] : lastLog.login,
        logout: isLoggedIn
          ? !lastLog.logout[0]
            ? [time]
            : [...lastLog.logout, time]
          : lastLog.logout,
        remarks: lastLog.remarks,
      };
      const logsCopy = [...logs];
      logsCopy[logsCopy.length - 1] = obj;
      setLogs(logsCopy);
    } else {
      setLogs([
        ...logs,
        {
          date: d,
          login: [!isLoggedIn ? time : ''],
          logout: [isLoggedIn ? time : ''],
          remarks: '',
        },
      ]);
    }

    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <section style={{ textAlign: 'center' }}>
      <p>
        You are{' '}
        <span
          className={`${styled.badge} ${
            isLoggedIn ? styled.loggedin : styled.loggedout
          }`}
        >
          {isLoggedIn ? 'Logged In' : 'Logged Out'}
        </span>
      </p>
      <Button text={isLoggedIn ? 'Logout' : 'Login'} func={handleClick} />
      {logs[logs.length - 1].login.length !== 0 && (
        <>
          <Button text="Clear Logs" func={clearLogs} />
          <Button text="Sync to server" func={sync} />
          {currentTable[0]?.date.date < 16 && (
            <Link className={styled.links} to={generateLink(1, params)}>
              Generate 1-15 cutoff
            </Link>
          )}
          {currentTable[currentTable.length - 1]?.date.date >= 16 && (
            <Link className={styled.links} to={generateLink(2, params)}>
              Generate 16-
              {getLastDayOfMonth(
                +params.year || date().year,
                Months[params.month] || date().month
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
