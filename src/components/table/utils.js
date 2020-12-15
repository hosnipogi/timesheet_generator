import Months from '../../lib/config/monthKeys';
import generateId from '../../lib/utils/generateUid';

export const generateRows = (logs) => {
  try {
    return (
      logs &&
      logs.map((log) => (
        <tr key={generateId()}>
          <td>{`${Months[log.date.month]} ${log.date.date}, ${
            log.date.year
          }`}</td>
          <td style={{ color: 'red' }}>
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

export { default as filterMonth } from '../../lib/utils/filterMonth';
