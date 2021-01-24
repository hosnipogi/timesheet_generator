import React from 'react';
import { useParams } from 'react-router-dom';
import { LogContext } from '../../lib/contexts/LogContext';
import { filterMonth, getLastDayOfMonth, generateRows } from './utils';
import Months from '../../lib/config/monthKeys';
import LSERV from './lserv';

type DTR<T extends {}> = (props: T) => JSX.Element;
const Dtr: DTR<{ template: string }> = ({ template }) => {
  const { logs } = React.useContext(LogContext);
  const date = new Date();
  const params = useParams<{ year: string; month: string; cutoff: string }>();
  const year = params.year || date.getFullYear();
  const month = Months[params.month] || date.getMonth();
  const cutoff: number | string = params.cutoff || 1;

  const filteredLogs = filterMonth(logs, +year, month);

  const content = generateRows({
    array: filteredLogs,
    cutoff: +cutoff,
    date: { year: +year, month },
  });

  switch (template) {
    case 'lserv':
      return (
        <LSERV
          logs={content}
          title={`${Months[month]} ${
            cutoff === 2 ? `16-${getLastDayOfMonth(+year, month)}` : '1 - 15'
          }, ${year}`}
        />
      );
    default:
      return <div>Select a template</div>;
  }
};

export default Dtr;
