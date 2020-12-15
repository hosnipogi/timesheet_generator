import React from 'react';

const useLocalStorage = (key) => {
  const initialValue = React.useMemo(() => localStorage.getItem(key), [key]);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (typeof value !== 'string') {
      const str = JSON.stringify(value);
      if (initialValue !== str) {
        localStorage.setItem(key, str);
      }
    }
  }, [initialValue, key, value]);

  return [value, setValue];
};

export default useLocalStorage;
