import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Message } from 'semantic-ui-react';
import AuthService from './AuthService';

class LoginPage extends React.Component {

  componentWillMount() {
    // if we are already logged in, we don't want to stay in login page
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  state = {
    username: '',
    password: '',
    error: '',
  };

  Auth = new AuthService();

  handleLoginSuccess = () => {
    // call function from props
    this.props.updateLoginStatus();
  };

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: undefined });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // get function pointer from props
    const { updateLoginStatus } = this.props;
    // check that both username AND password are not empty
    const { username, password } = this.state;
    // alert("a username was submitted: " + username + "\na password was submitted: " + password);

    this.Auth.login(username, password)
      .then((res) => {
        // if successful, we will redirect to home page and update login status
        this.props.updateLoginStatus();
        this.props.history.replace('/');
      })
      .catch((err) => {
        // otherwise, catch error and display to user
        // console.log(err);
        // alert(err);
        this.setState({ error: 'Invalid Username and/or Password' });
      })
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="login-page__main-container">
        <Form onSubmit={this.handleSubmit}>
          {
            error &&  <Message size='small' negative>
                        {error}
                      </Message>
          }
          <Form.Field>
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

          <Button type="submit" color="blue" size="small">Log In</Button>
        </Form>

      </div>
    );
  }

};

export default LoginPage;
