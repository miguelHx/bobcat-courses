import React, { Component } from 'react';
import { Button, Menu, Sidebar, Icon } from 'semantic-ui-react';
import { NavBarMenuItemsMobile } from './NavBarMenuItems';
import onClickOutside from "react-onclickoutside";
import logo from "../../../assets/images/bobcat-logo.png";

class MobileNavBarMenu extends Component {
  state = {
    visible: false,
  };

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleClickOutside = (event) => this.setState({ visible: false }); // used by react-onclickOutside.

  render() {
    const { visible } = this.state;
    const { updateLogoutStatus, isLoggedIn } = this.props;
    return [
      <Sidebar
        as={Menu}
        animation='overlay'
        color='blue'
        icon='labeled'
        inverted
        vertical
        visible={visible}
        width='thin'
        direction='right'
        key='sidebar-mobile'
      >
        <NavBarMenuItemsMobile
          updateLogoutStatus={updateLogoutStatus}
          isLoggedIn={isLoggedIn}
          handleButtonClick={this.handleButtonClick}
        />
      </Sidebar>,
      <Menu.Item position='right' key='mobile-button'>
        <Button
          onClick={this.handleButtonClick}
          size='mini'
          color='blue'
          compact
        >
          
        </Button>
      </Menu.Item>
    ];
  }
}

export default onClickOutside(MobileNavBarMenu);