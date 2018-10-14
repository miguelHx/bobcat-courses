import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import AuthService from '../../login/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import './LoginPage.css';
import { withSizes } from "react-sizes";
import {TOAST_OPTIONS} from "../../utils/ToastOptions";

class LoginPage extends React.Component {
  componentWillMount() {
    // if we are already logged in, we don't want to stay in login page
    if (AuthService.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  state = {
    username: '',
    password: '',
    error: '',
  };

  handleLoginSuccess = () => {
    this.props.updateLoginStatus();
  };

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: undefined });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    AuthService.login(username, password)
      .then((res) => {
        // if successful, we will redirect to home page and update login status
        this.handleLoginSuccess();
        toast.success("Login Successful 😎", TOAST_OPTIONS);
        this.props.history.replace('/');
      })
      .catch((err) => {
        this.setState({ error: 'Error during login (Invalid user/pass)' });
      })
  };

  render() {
    const { username, password, error } = this.state;
    const { isMobile } = this.props;
    return (
      <div className="login-signup-page__main-container">
        <Message
          header='Great to see you back!'
          content='Fill out the form below to log in.'
          className='signup-page__welcome-msg'
          info
        />
        <Form onSubmit={this.handleSubmit} size={isMobile ? 'big' : 'large'}>
          {
            error &&  <Message size='small' negative>
              {error}
            </Message>
          }
          <Form.Field required>
            <label>Username</label>
            <input
              placeholder="Username"
              name="username"
              type="text"
              value={username}
              onChange={this.handleUserInput}
              required
            />
          </Form.Field>
          <Form.Field required>
            <label>Password</label>
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleUserInput}
              required
            />
          </Form.Field>
          <Button type="submit" color="blue" size={isMobile ? 'big' : 'large'}>Log In</Button>
        </Form>
        <ToastContainer autoClose={3500}/>
      </div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
});

export default withSizes(mapSizesToProps)(LoginPage);
