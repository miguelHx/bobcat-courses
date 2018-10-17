import React from 'react';
import AuthService from '../../login/AuthService';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../Forms/LoginForm';
import './LoginPage.css';

class LoginPage extends React.Component {
  componentWillMount() {
    // if we are already logged in, we don't want to stay in login page
    if (AuthService.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleLoginSuccess = () => {
    this.props.updateLoginStatus();
    this.props.history.replace('/');
  };

  render() {
    return (
      <div className="login-signup-page__main-container">
        <h1 className="center-text">Log In</h1>
        <LoginForm handleLoginSuccess={this.handleLoginSuccess}/>
        <ToastContainer autoClose={3500}/>
      </div>
    );
  }
}



export default LoginPage;
