import React from 'react';
import logo from '../../assets/bobcat-logo.png';

const Header = (props) => {
  return (
    <div className="header">
      <div className="container">
        <img src={logo} />
        <div className="header__text__wrapper">
          <h1 className="header__title">{props.title}</h1>
          <h2 className="header__subtitle">{props.subtitle}</h2>
        </div>
      </div>

    </div>
  );
};

Header.defaultProps = {
  title: 'Bobcat Courses',
  subtitle: 'Plan your schedule for the upcoming semester'
};

export default Header;
