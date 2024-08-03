import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.webp';

const SimpleHeader = (props) => {
  return (
    <header className="header" id="simple-header-content">
      <Link to="/">
        <picture>
          <img
            src={logo}
            alt="logo"
            className="logo"
          />
        </picture>
      </Link>
    </header>
  );
};

export default SimpleHeader;
