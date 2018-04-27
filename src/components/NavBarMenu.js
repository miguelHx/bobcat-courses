import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';

class MenuExampleBasic extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { isLoggedIn, username } = this.props;
    const { updateLogoutStatus, history } = this.props;
    const { activeItem } = this.state;

    return (
      <Menu className="navbar-menu" stackable>
        <Menu.Item
          as={Link} to="/"
          name='plan-schedule'
          active={activeItem === 'plan-schedule'}
          onClick={this.handleItemClick}
        >
          Plan Schedule
        </Menu.Item>

        <Menu.Item
          as={Link} to="/saved-schedules"
          name='saved-schedules'
          active={activeItem === 'saved-schedules'}
          onClick={this.handleItemClick}
        >
          Saved Schedules
        </Menu.Item>

        { !isLoggedIn &&  <Menu.Menu position='right'>
                            <Menu.Item
                              as={Link}
                              to="/sign-up"
                              name='sign up'
                              active={activeItem === 'sign up'}
                              onClick={this.handleItemClick}
                            />
                            <Menu.Item
                              as={Link}
                              to="/login"
                              name='log in'
                              active={activeItem === 'log in'}
                              onClick={this.handleItemClick}
                            />
                          </Menu.Menu>
        }

        { isLoggedIn && <Menu.Menu position='right'>
                          <Menu.Item
                            as={Link}
                            to="/settings"
                            name='settings'
                            active={activeItem === 'settings'}
                            onClick={this.handleItemClick}
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
  }
}

export default MenuExampleBasic;
