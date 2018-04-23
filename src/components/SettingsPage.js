import React from 'react';
import AuthService from './AuthService';
import withAuth from './withAuth';
import { Redirect } from "react-router-dom";

class SettingsPage extends React.Component {

  Auth = new AuthService();

  componentWillMount() {
    // if we are already logged in, we don't want to stay in settings page
    if (!this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  render () {

    return (
      <div className="">
        Settings Page goes here.
      </div>
    );
  }

};

export default withAuth(SettingsPage);
