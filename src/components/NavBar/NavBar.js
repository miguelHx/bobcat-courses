import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { NavBarMenuItemsFull } from './NavBarMenuItems';
import MobileNavBarMenu from './MobileNavBarMenu';
import logo from '../../assets/images/bobcat-logo.png';
import withSizes from 'react-sizes';
import './NavBar.css';

// for giving isMobile prop to NavBar
const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
});

const NavBar = (props) => {
  const { updateLogoutStatus, isLoggedIn, isMobile } = props;
  return (
    <Menu
      className="navbar-menu"
      color='blue'
      inverted
      size={isMobile ? 'large' : 'small'}
    >
      <Menu.Item
        header
        as={Link}
        to="/"
        className="navbar-menu__header"
      >
        <img src={logo} alt="Bobcat Courses" />
        Bobcat Courses
      </Menu.Item>
      { isMobile ?
        <MobileNavBarMenu
          updateLogoutStatus={updateLogoutStatus}
          isLoggedIn={isLoggedIn}
        />
        :
        <NavBarMenuItemsFull
          updateLogoutStatus={updateLogoutStatus}
          isLoggedIn={isLoggedIn}
        />
      }
    </Menu>
  );
};

export default withSizes(mapSizesToProps)(NavBar);
