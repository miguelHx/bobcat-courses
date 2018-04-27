import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/bobcat-logo.png';

const Header = (props) => {
    return (
      <header className="header">
        <div className="header__container">
          <img src={logo} />
          <div className="header__text__wrapper">
            <h1 className="header__title">{props.title}</h1>
            <h2 className="header__subtitle">{props.subtitle}</h2>
          </div>
        </div>
      </header>
    );

}

Header.defaultProps = {
  title: 'Bobcat Courses',
  subtitle: 'Plan your schedule for the upcoming semester'
};

export default Header;
