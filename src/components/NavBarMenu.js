import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';

const Nav = (props) => {
  return (
    <NavLink
      exact
      {...props}
    />
  );
};

const NavBarMenu = (props) => {
  const { isLoggedIn, username } = props;
  const { updateLogoutStatus, history } = props;
  return (
    <Menu className="navbar-menu" stackable color='blue'>
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
