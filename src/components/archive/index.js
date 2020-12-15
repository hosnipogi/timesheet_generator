import React from 'react';
import { Link } from 'react-router-dom';
import { LogContext } from '../../lib/contexts/LogContext';
import Months from '../../lib/config/monthKeys';
import generateId from '../../lib/utils/generateUid';

/**
 * Filter and generate only unique months or years
 * @param {Array} arr The date array
 * @param {String} d The string "months" or "year"
 * @param {CallableFunction} cb Callback
 * @return {Array} Returns an array with unique items
 */
const unique = (arr, d, cb) =>
  arr
    .map(({ date }) => date[d])
    .filter((i, position, self) => self.indexOf(i) === position)
    .map((final, index) => typeof cb === 'function' && cb(final, index));

const Archive = () => {
  const { logs } = React.useContext(LogContext);

  const archive = unique(logs, 'year', (yr, _) =>
    logs.filter(({ date: { year } }) => year === yr)
  );

  return (
    <div>
      <h3>Archive</h3>
      <ul>
        {archive.map((i) => (
          <li key={generateId()}>
            {i[0].date.year}
            <ul>
              {unique(i, 'month', (r, _) => (
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
  );
};

export default Archive;
