import React from 'react';
import BobcatCoursesApi from "../../api/BobcatCoursesApi";
import {TOAST_OPTIONS} from "../../utils/ToastOptions";
import { toast } from 'react-toastify';
import { Button, Form, Message } from "semantic-ui-react";
import { withSizes } from "react-sizes";
import AuthService from '../../login/AuthService';


class SignUpForm extends React.Component {

  state = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    error: '',
  };

  // makes an api call to sign up user and handles then logic
  // NOTE: userData is stringified!
  signUpUser = (userData) => {
    BobcatCoursesApi.signUp(userData)
      .then(res => {
        // success status lies between 200 to 300
        // if successful, want alert user, then attempt a log in.
        toast.success("Sign-up Successful 😝", TOAST_OPTIONS);
        let parsed = JSON.parse(userData);
        AuthService.login(parsed.username, parsed.password)
          .then((res) => {
            // if successful, we will redirect to home page and update login status
            this.props.updateLoginStatus();
            toast.success("Login Successful 😎", TOAST_OPTIONS);
            this.props.history.replace('/');
          })
          .catch((err) => {
            this.setState({ error: 'Unable to Login at this time.' });
          });
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.setState(() => ({ error: error.response.data['error'] }));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        // console.log(error.config);
      });
  };

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

    this.signUpUser(data);

  };

  render() {
    const { username, email, firstName, lastName, password, confirmPassword, error } = this.state;
    const { isMobile } = this.props;
    return (
      <div className="signup-form">
        <Message
          header='Welcome to Bobcat Courses!'
          content='Fill out the form below to sign-up for a new account'
          className='signup-page__welcome-msg'
          info
        />
        <Form onSubmit={this.handleSubmit} size={isMobile ? 'big' : 'large'}>
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
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={this.handleUserInput}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.handleUserInput}
              />
            </Form.Field>

            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.handleUserInput}
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
          <Button type="submit" color="blue" size={isMobile ? 'big' : 'large'}>Sign Up</Button>
        </Form>
      </div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
});

export default withSizes(mapSizesToProps)(SignUpForm);
