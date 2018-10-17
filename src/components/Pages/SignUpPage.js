import React from 'react';
import AuthService from '../../login/AuthService';
import { ToastContainer } from 'react-toastify';
import './SignUpPage.css';
import SignUpForm from "../Forms/SignUpForm";

class SignUpPage extends React.Component {

  componentWillMount() {
    // if we are already logged in, we don't want to stay in login page
    if (AuthService.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <div className="login-signup-page__main-container">
        <h1 className="center-text">Sign Up</h1>
        <SignUpForm
          updateLoginStatus={this.props.updateLoginStatus}
          history={this.props.history}
        />
        <ToastContainer autoClose={3500}/>
      </div>
    );
  }
}

export default SignUpPage;
