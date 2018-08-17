import React from 'react';
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

// there is a slight distinction between the following two components.
const NavBarMenuItemsMobile = (props) => {
  const { updateLogoutStatus, isLoggedIn } = props;
  return [
    <Menu.Item
      as={Nav} to="/"
      name='plan-schedule'
      key='plan-schedule-mobile'
      onClick={props.handleButtonClick}
    >
      Plan Schedule
    </Menu.Item>,
    <Menu.Item
      as={Nav} to="/saved-schedules"
      name='saved-schedules'
      key='saved-schedules-mobile'
      onClick={props.handleButtonClick}
    >
      Saved Schedules
    </Menu.Item>,
    !isLoggedIn ?
      [
        <Menu.Item
          as={Nav}
          to="/signup"
          name='sign up'
          key='sign-up-mobile'
          onClick={props.handleButtonClick}
        />,
        <Menu.Item
          as={Nav}
          to="/login"
          name='log in'
          key='log-in-mobile'
          onClick={props.handleButtonClick}
        />
      ]
      :
      [
        <Menu.Item
          as={Nav}
          to="/settings"
          name='settings'
          key='settings-mobile'
          onClick={props.handleButtonClick}
        />,
        <Menu.Item key='log-out-mobile'>
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
      ]
  ];
};

const NavBarMenuItemsFull = (props) => {
  const { updateLogoutStatus, isLoggedIn } = props;
  return [
    <Menu.Item
      as={Nav} to="/"
      name='plan-schedule'
      key='plan-schedule-full'
    >
      Plan Schedule
    </Menu.Item>,
    <Menu.Item
      as={Nav} to="/saved-schedules"
      name='saved-schedules'
      key='saved-schedules-full'
    >
      Saved Schedules
    </Menu.Item>,
    !isLoggedIn ?
      <Menu.Menu position='right' key='logged-out-options-full'>
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
      : // or
      <Menu.Menu position='right' key='logged-in-options-full'>
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
  ];
};

export { NavBarMenuItemsFull, NavBarMenuItemsMobile };