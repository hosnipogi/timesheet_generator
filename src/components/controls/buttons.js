import React from 'react'

const Button = (props) => {
  const { func, isLoggedIn } = props;
  return <button onClick={func}>{isLoggedIn ? 'Log out' : 'Log in'}</button>;
};

export default Button;
