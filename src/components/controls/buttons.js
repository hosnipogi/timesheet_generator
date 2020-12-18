import React from 'react';
import styled from './controls.module.css';

const Button = (props) => {
  const { func, text } = props;
  return (
    <button className={styled.myButton} onClick={func}>
      {text}
    </button>
  );
};

export default Button;
