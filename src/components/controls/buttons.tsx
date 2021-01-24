import React from 'react';
// import styled from './controls.module.css';

type ButtonProps = {
  func: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

const Button = ({ func, text }: ButtonProps) => (
  <button className="hosni" onClick={func}>
    {text}
  </button>
);

export default Button;
