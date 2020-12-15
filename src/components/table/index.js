import React from 'react';
import { LogContext } from '../../lib/contexts/LogContext';
import { filterMonth, generateRows } from './utils';
import Months from '../../lib/config/monthKeys';
import Controls from '../../components/controls';

const Table = (props) => {
  const { match } = props;
  const { logs } = React.useContext(LogContext);
  const { year, month } = match.params;
  const date = new Date();

  const currentMonth = filterMonth(
    logs,
    year ? year : date.getFullYear(),
    month ? Months.indexOf(month) : date.getMonth()
  );

  const content = generateRows(currentMonth);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Login</th>
            <th>Logout</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
      <Controls />
    </>
  );
};

export default Table;
