import React from 'react';
import { useParams } from 'react-router-dom';
import { LogContext } from '../../lib/contexts/LogContext';
import { filterMonth, getLastDayOfMonth, generateRows } from './utils';
import Months from '../../lib/config/monthKeys';
import LSERV from './lserv/';

const Dtr = ({ template }) => {
  const { logs } = React.useContext(LogContext);
  const date = new Date();
  const params = useParams();
  const year = params.year || date.getFullYear();
  const month = Months.indexOf(params.month) || date.getMonth();
  const cutoff = parseInt(params.cutoff) || 1;

  const filteredLogs = filterMonth(logs, year, month);

  const content = generateRows({
    array: filteredLogs,
    cutoff,
    date: { year, month },
  });

  switch (template) {
    case 'lserv':
      return (
        <LSERV
          logs={content}
          title={`${Months[month]} ${
            cutoff === 2 ? `16-${getLastDayOfMonth(year, month)}` : '1 - 15'
          }, ${year}`}
        />
      );
    default:
      return <div>Select a template</div>;
  }
};

export default Dtr;
