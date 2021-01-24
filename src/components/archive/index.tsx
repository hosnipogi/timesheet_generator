import React from 'react';
import { Link } from 'react-router-dom';
import { LogContext } from '../../lib/contexts/LogContext';
import Months from '../../lib/config/monthKeys';
import generateId from '../../lib/utils/generateUid';
import styled from './archive.module.css';

import { IDate } from '../../lib/config/date';
/**
 * Filter and generate only unique months or years
 * @param {IDate[]} arr The date array
 * @param {String} d The string "month" or "year"
 * @param {CallableFunction} cb Callback
 * @return {IDate[]} Returns an array with unique items
 */
const unique = (
  arr: IDate[],
  d: 'month' | 'year',
  cb: CallableFunction
): IDate[] =>
  arr
    .map(({ date }) => {
      return date[d];
    })
    .filter((i, position, self) => self.indexOf(i) === position)
    .map((final, index) => cb(final, index));

const Archive = () => {
  const { logs } = React.useContext(LogContext);
  const archive = unique(logs, 'year', (yr: number, _: undefined) =>
    logs.filter(({ date: { year } }) => year === yr)
  );

  return (
    <>
      {logs[0].login.length !== 0 && (
        <div className={styled.archive}>
          <h3>Archive</h3>
          <ul>
            {archive.map((i) => (
              <li key={generateId()}>
                {i[0].date.year}
                <ul>
                  {unique(i as any, 'month', (r: number, _: undefined) => (
                    <li key={generateId()}>
                      <Link to={`/${i[0].date.year}/${Months[r]}`}>
                        {Months[r]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Archive;
