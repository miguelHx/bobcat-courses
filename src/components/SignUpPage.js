import React from 'react';
import axios from 'axios';
import { Button, Form, Message } from 'semantic-ui-react';
import AuthService from './AuthService';
import Alert from 'react-s-alert';

const BASE_URL = 'https://cse120-course-planner.herokuapp.com/api';

class SignUpPage extends React.Component {

  componentWillMount() {
    // if we are already logged in, we don't want to stay in login page
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  state = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    error: '',
  };

  Auth = new AuthService();

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value, error: '' }));
  };


  handleSubmit = (event) => {
    event.preventDefault();
    // get password and confirmPassword
    const { username, password, confirmPassword } = this.state;
    // some form validation
    if (username.indexOf(" ") >= 0) {
      this.setState(() => ({ error: 'Username must contain NO spaces.' }));
      return;
    }

    if (password.length < 7 || confirmPassword.length < 7) {
      this.setState(() => ({ error: 'Password must be at least 7 characters. Please try again' }));
      return;
    }

    if (password !== confirmPassword) {
      this.setState(() => ({ error: 'Passwords do not match. Please try again.' }));
      return;
    }

    const { email, firstName, lastName, } = this.state;

    // otherwise, attempt to sign up user and then log them in.
    let data = JSON.stringify({
        username: username,
        email: email,
        name: `${firstName} ${lastName}`,
        firstname: firstName,
        lastname: lastName,
        password: password,
    });

    axios.post(`${BASE_URL}/register/`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        // success status lies between 200 to 300
        // if successful, want alert user, then attempt a log in.
        Alert.success("Sign Up Successful", {
          position: 'top-right',
          offset: 0,
        });

        this.Auth.login(username, password)
          .then((res) => {
            // if successful, we will redirect to home page and update login status
            this.props.updateLoginStatus();
            Alert.success("Log In Successful", {
              position: 'top-right',
              offset: 0,
            });
            this.props.history.replace('/');
          })
          .catch((err) => {
            this.setState({ error: 'Unable to Login at this time.' });
          })

      }
      else {
        let error = new Error(res.statusText);
        error.response = response;
        throw error;
      }
    })
    .catch(error => {
      // console.log(error);
      this.setState(() => ({ error: error }));
    });
  };

  render() {
    const { username, email, firstName, lastName, password, confirmPassword, error } = this.state;
    return (
      <div className="login-signup-page__main-container">
        <Message
          header='Welcome to Bobcat Courses!'
          content='Fill out the form below to sign-up for a new account'
          className='signup-page__welcome-msg'
        />
        <Form onSubmit={this.handleSubmit}>
          {
            error &&  <Message size='small' negative>
              {error}
            </Message>
          }
          <Form.Group widths='equal'>
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
              <label>Email</label>
              <input
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={this.handleUserInput}
                required
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Field required>
              <label>First Name</label>
              <input
                placeholder="First Name"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.handleUserInput}
                required
              />
            </Form.Field>

            <Form.Field required>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.handleUserInput}
                required
              />
            </Form.Field>
          </Form.Group>

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

          <Form.Field required>
            <label>Confirm Password</label>
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={this.handleUserInput}
              required
            />
          </Form.Field>

          <Button type="submit" color="blue" size="small">Sign Up</Button>
        </Form>
        <Alert stack={{limit: 2}} timeout={2000} />
      </div>
    );
  }
}

export default SignUpPage;
