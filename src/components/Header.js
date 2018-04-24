import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/bobcat-logo.png';

const Header = (props) => {
    const { isLoggedIn, username } = props;
    const { updateLogoutStatus, history } = props;
    return (
      <header className="header">
        <div className="header__container">
          <img src={logo} />
          <div className="header__text__wrapper">
            <h1 className="header__title">{props.title}</h1>
            <h2 className="header__subtitle">{props.subtitle}</h2>
          </div>
        </div>
        <NavLink to="/" activeClassName="is-active" exact={true}>Plan Schedule</NavLink>
        <NavLink to="/saved-schedules" activeClassName="is-active">Saved Schedules</NavLink>
        {
          !isLoggedIn &&  <div>
                            <NavLink to="/login" activeClassName="is-active">Login</NavLink>
                            <NavLink to="/sign-up" activeClassName="is-active">Sign Up</NavLink>
                          </div>
        }
        {
          isLoggedIn && <div>
                          <NavLink to="/settings" activeClassName="is-active">Settings</NavLink>
                          <h2>Welcome {username}!</h2>
                          <button onClick={() => {
                            updateLogoutStatus();
                          }}>
                            Log Out
                          </button>
                        </div>
        }
      </header>
    );

}

Header.defaultProps = {
  title: 'Bobcat Courses',
  subtitle: 'Plan your schedule for the upcoming semester'
};

export default Header;
