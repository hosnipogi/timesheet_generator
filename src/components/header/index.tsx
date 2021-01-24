import React from 'react';
import Nav from './nav';
import Clock from '../clock';
import generateUid from '../../lib/utils/generateUid';
import styled from './header.module.css';

const Header = () => {
  return (
    <header>
      <p>
        User id: <span className={styled.badge}>{generateUid()}</span>
      </p>
      <hr />
      <Clock />
      <Nav />
    </header>
  );
};

export default Header;
