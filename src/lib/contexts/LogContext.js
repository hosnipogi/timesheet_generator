import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOGS } from '../config/localStorageKeys';

export const LogContext = React.createContext({ time: null });

export const LogProvider = ({ children }) => {
  const [localStorageLogs, setLocalStorageLogs] = useLocalStorage(LOGS);
  const [logs, setLogs] = React.useState(
    typeof localStorageLogs === 'string' ? JSON.parse(localStorageLogs) : []
  );

  React.useEffect(() => {
    logs && setLocalStorageLogs(logs);
  }, [logs, setLocalStorageLogs]);

  return (
    <LogContext.Provider value={{ logs, setLogs }}>
      {children}
    </LogContext.Provider>
  );
};
