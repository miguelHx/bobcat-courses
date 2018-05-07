import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import logo from '../../assets/images/bobcat-logo.png';

const Nav = (props) => {
  return (
    <NavLink
      exact
      {...props}
    />
  );
};

const NavBarMenu = (props) => {
  const { updateLogoutStatus, isLoggedIn } = props;
  return (
    <Menu className="navbar-menu" stackable color='blue' inverted size='mini'>
      <Menu.Item
        header
        as={Link}
        to="/"
        className="navbar-menu__header"
      >
        <img src={logo} />
        Bobcat Courses
      </Menu.Item>
      <Menu.Item
        as={Nav} to="/"
        name='plan-schedule'
      >
        Plan Schedule
      </Menu.Item>

      <Menu.Item
        as={Nav} to="/saved-schedules"
        name='saved-schedules'
      >
        Saved Schedules
      </Menu.Item>

      { !isLoggedIn &&  <Menu.Menu position='right'>
                          <Menu.Item
                            as={Nav}
                            to="/signup"
                            name='sign up'
                          />
                          <Menu.Item
                            as={Nav}
                            to="/login"
                            name='log in'
                          />
                        </Menu.Menu>
      }

      { isLoggedIn && <Menu.Menu position='right'>
                        <Menu.Item
                          as={Nav}
                          to="/settings"
                          name='settings'
                        />

                        <Menu.Item>
                          <Button
                            onClick={() => {
                              sessionStorage.clear();
                              document.location.reload();
                              updateLogoutStatus();
                            }}
                            color='red'
                            size='mini'
                            compact
                          >
                            Log Out
                          </Button>
                        </Menu.Item>
                      </Menu.Menu>
      }
    </Menu>
  );
};

export default NavBarMenu;
