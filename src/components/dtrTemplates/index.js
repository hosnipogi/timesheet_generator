import React from 'react';
import { useParams } from 'react-router-dom';
import { LogContext } from '../../lib/contexts/LogContext';
import { filterMonth, generateRows } from './utils';
import Months from '../../lib/config/monthKeys';
import LSERV from './lserv/';
import './lserv/style.css';

const Dtr = ({ template }) => {
  const { logs } = React.useContext(LogContext);
  const params = useParams();
  const { year, month, cutoff } = params;
  const date = new Date();

  const filteredLogs = filterMonth(
    logs,
    year ? year : date.getFullYear(),
    month ? Months.indexOf(month) : month.getMonth()
  );

  const content = generateRows({
    array: filteredLogs,
    cutoff: cutoff || 1,
    date: { year, month },
  });

  switch (template) {
    case 'lserv':
      return <LSERV logs={content} />;
    default:
      return <div>Select a template</div>;
  }
};

export default Dtr;
