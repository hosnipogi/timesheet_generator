import React from 'react';
import generateId from '../../../lib/utils/generateUid';

const Lserv = ({ logs }) => {
  return (
    <>
      <p>EMP NO.</p>
      <p>EMPLOYEE NAME</p>
      <p>DEPARTMENT</p>
      <p>PAY PERIOD</p>
      <p>TIME SCHEDULE</p>

      <table>
        <thead>
          <tr>
            <th rowSpan={2}>DAY</th>
            <th rowSpan={2}>TIME IN</th>
            <th rowSpan={2}>BREAK OUT</th>
            <th rowSpan={2}>BREAK IN</th>
            <th rowSpan={2}>TIME OUT</th>
            <th colSpan={2}>OVERTIME</th>
            <th rowSpan={2}>REMARKS</th>
            <td rowSpan={2} className="lserv_table-spacer" />
            <td rowSpan={2}>TOTAL OVERTIME</td>
            <td rowSpan={2}>Absences</td>
            <td rowSpan={2}>Late/Undertime</td>
          </tr>
          <tr>
            <th>TIME IN</th>
            <th>TIME OUT</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((i) => (
            <tr key={generateId()}>
              <td>{i.date.date}</td>
              <td>
                {i.login.map((t) => (
                  <span key={generateId()} style={{ color: 'red' }}>
                    {t}&nbsp;/&nbsp;
                  </span>
                ))}
              </td>
              <td />
              <td />
              <td>
                {i.logout.map((t) => (
                  <span key={generateId()} style={{ color: 'green' }}>
                    {t}&nbsp;/&nbsp;
                  </span>
                ))}
              </td>
              <td />
              <td />
              <td />
              <td className="lserv_table-spacer" />
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        I hereby certify that the above is a true and correct report of the
        hours of work performed, records of which was made daily at the time of
        arrival at and departure from Office.
      </p>
      <section>
        <p>EMPLOYEE'S SIGNATURE</p>
        <p>AUTHORIZED SUPERVISOR/HEAD OF OFFICE</p>
      </section>
    </>
  );
};

export default Lserv;
