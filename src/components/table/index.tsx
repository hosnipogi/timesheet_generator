import React from 'react';
import { LogContext } from '../../lib/contexts/LogContext';
import { filterMonth } from './utils';
import Months from '../../lib/config/monthKeys';
import Controls from '../controls';
import generateId from '../../lib/utils/generateUid';
import styled from './table.module.css';
import { RouteComponentProps } from 'react-router-dom';
import { IDate } from '../../lib/config/date';

const Table: (
  props: RouteComponentProps<{ year: string; month: string }>
) => JSX.Element = ({ match }) => {
  const { logs, setLogs } = React.useContext(LogContext);
  const [filteredMonth, setFilteredMonth] = React.useState<IDate[]>([]);
  const [remarks, setRemarks] = React.useState<string[] | string>('');

  React.useEffect(() => {
    const date = new Date();
    const { year, month } = match.params;
    const filteredMonth = filterMonth(
      logs,
      year ? +year : date.getFullYear(),
      month ? Months[month] : date.getMonth()
    );
    setFilteredMonth(filteredMonth);

    return () => console.log('table unmounted');
  }, [logs, match.params]);

  React.useEffect(() => setRemarks(filteredMonth.map((r) => r.remarks)), [
    filteredMonth,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (Array.isArray(remarks)) {
      const rows = [...remarks];
      rows[index] = e.target.value;
      setRemarks(rows);
    }
  };

  const handleBlur = (
    year: number,
    month: number,
    date: number,
    index: number
  ) => {
    const matchedLog = logs.map((log) => {
      if (
        remarks &&
        log.date.date === date &&
        log.date.month === month &&
        log.date.year === year
      ) {
        log.remarks = remarks[index];
      }
      return log;
    });
    setLogs(matchedLog);
  };

  return (
    <section className={styled.main}>
      {filteredMonth[0]?.login.length !== 0 ? (
        <table className={styled.unstyledTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Login</th>
              <th>Logout</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredMonth[0]?.login.length !== 0 &&
              filteredMonth.map((log, index) => (
                <tr
                  key={`${log.date.year}-${log.date.month}-${log.date.date}-${index}`}
                >
                  <td>{`${Months[log.date.month]} ${log.date.date}, ${
                    log.date.year
                  }`}</td>
                  <td style={{ color: 'red' }} valign="top">
                    {log.login.map((l) => (
                      <span key={generateId()} style={{ display: 'block' }}>
                        {l}
                      </span>
                    ))}
                  </td>
                  <td style={{ color: 'green' }} valign="top">
                    {log.logout.map((l) => (
                      <span key={generateId()} style={{ display: 'block' }}>
                        {l}
                      </span>
                    ))}
                  </td>
                  <td>
                    <input
                      type="text"
                      className={styled.remarks}
                      onChange={(e) => handleChange(e, index)}
                      onBlur={() =>
                        handleBlur(
                          log.date.year,
                          log.date.month,
                          log.date.date,
                          index
                        )
                      }
                      value={remarks ? remarks[index] : remarks}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No record yet</p>
      )}
      <Controls currentTable={filteredMonth} />
    </section>
  );
};

export default Table;
