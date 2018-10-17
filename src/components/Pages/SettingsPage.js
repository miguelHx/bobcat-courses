import React from 'react';
import AuthService from '../../login/AuthService';
import './SettingsPage.css';
import UpdatePasswordForm from "../Forms/UpdatePasswordForm";

class SettingsPage extends React.Component {

  componentWillMount() {
    // if we are not logged in, we don't want to stay in settings page
    if (!AuthService.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  render () {
    return (
      <div className="settings-page__main-container">
        <h1 className="center-text">Settings</h1>
        <UpdatePasswordForm />
      </div>
    );
  }
}

export default SettingsPage;
