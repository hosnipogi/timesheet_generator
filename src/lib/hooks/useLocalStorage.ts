import React from 'react';

const useLocalStorage = (key: string) => {
  const initialValue = React.useMemo(() => localStorage.getItem(key), [key]);
  const [value, setValue] = React.useState(!initialValue ? '' : initialValue);
  

  React.useEffect(() => {
    if (!initialValue || initialValue !== value) {
      localStorage.setItem(key, value);
    }
  }, [initialValue, key, value]);

  return [value, setValue] as [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
};

export default useLocalStorage;
