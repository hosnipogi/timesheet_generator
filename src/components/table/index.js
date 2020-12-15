import React from 'react';
import { LogContext } from '../../lib/contexts/LogContext';

const generateRows = (logs) => {
  try {
    return (
      logs &&
      logs.map((log, index) => (
        <tr key={index}>
          <td>{log.date}</td>
          <td style={{ color: 'red' }}>
            {log.login.map((l) => (
              <span key={l} style={{ display: 'block' }}>
                {l}
              </span>
            ))}
          </td>
          <td style={{ color: 'green' }} valign="top">
            {log.logout.map((l) => (
              <span key={l} style={{ display: 'block' }}>
                {l}
              </span>
            ))}
          </td>
        </tr>
      ))
    );
  } catch (e) {
    console.log({ e, msg: e.message });
    return (
      <tr>
        <td>Error</td>
      </tr>
    );
  }
};

const Table = () => {
  const { logs } = React.useContext(LogContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Login</th>
          <th>Logout</th>
        </tr>
      </thead>
      <tbody>{generateRows(logs)}</tbody>
    </table>
  );
};

export default Table;
