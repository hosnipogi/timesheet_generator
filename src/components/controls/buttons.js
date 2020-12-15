import React from 'react'

const Button = (props) => {
  const { func, text } = props;
  return <button onClick={func}>{text}</button>;
};

export default Button;
