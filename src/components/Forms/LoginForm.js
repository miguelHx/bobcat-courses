import React from 'react';
import AuthService from "../../login/AuthService";
import {toast} from "react-toastify";
import {TOAST_OPTIONS} from "../../utils/ToastOptions";
import {Button, Form, Message} from "semantic-ui-react";
import { withSizes } from "react-sizes";


class LoginForm extends React.Component {

  state = {
    username: '',
    password: '',
    error: '',
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
        this.props.handleLoginSuccess();
        toast.success("Login Successful 😎", TOAST_OPTIONS);
      })
      .catch((err) => {
        this.setState({ error: 'Error during login (Invalid user/pass)' });
      })
  };

  render() {
    const { username, password, error } = this.state;
    const { isMobile } = this.props;
    return (
      <div className="login-form">
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
      </div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
});

export default withSizes(mapSizesToProps)(LoginForm);
