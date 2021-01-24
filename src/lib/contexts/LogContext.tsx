import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Keys } from '../config/localStorageKeys';
import { IDate } from '../../lib/config/date';
import shape from '../config/logObjectShape';

interface IProviderValue {
  logs: IDate[];
  setLogs: React.Dispatch<React.SetStateAction<IDate[]>>;
}

const InitialValue: IProviderValue = {
  logs: [shape],
  setLogs: () => null,
};

export const LogContext = React.createContext<IProviderValue>(InitialValue);

export const LogProvider: React.FC = ({ children }) => {
  const [localStorageLogs, setLocalStorageLogs] = useLocalStorage(Keys.LOGS);
  const [logs, setLogs] = React.useState(
    localStorageLogs ? (JSON.parse(localStorageLogs) as IDate[]) : [shape]
  );

  React.useEffect(() => {
    if (logs[0].login.length || logs[0].logout.length) {
      setLocalStorageLogs(JSON.stringify(logs));
    }
  }, [logs, setLocalStorageLogs]);

  return (
    <LogContext.Provider value={{ logs, setLogs }}>
      {children}
    </LogContext.Provider>
  );
};
