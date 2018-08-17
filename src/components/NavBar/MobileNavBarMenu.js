import React, { Component } from 'react';
import { Button, Menu, Sidebar } from 'semantic-ui-react';
import { NavBarMenuItemsMobile } from './NavBarMenuItems';

export default class VisibilityExampleCallbackFrequency extends Component {
  state = {
    visible: false,
  };

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    const { updateLogoutStatus, isLoggedIn } = this.props;
    return [
      <Menu.Item position='right' key='mobile-button'>
        <Button
          onClick={this.handleButtonClick}
          size='mini'
          color='blue'
          compact
        >
          -
          -
          -
        </Button>
      </Menu.Item>,
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
        />
      </Sidebar>
    ];
  }
}