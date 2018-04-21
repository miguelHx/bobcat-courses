import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form } from 'semantic-ui-react';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
  };

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // check that both username AND password are not empty
    const { username, password } = this.state;
    alert("a username was submitted: " + username + "\na password was submitted: " + password);
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="login-page__main-container">
        <Form onSubmit={this.handleSubmit}>
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
          {error && <div className="error">{error}</div>}
          <Button type="submit" color="blue" size="small">Log In</Button>
        </Form>

      </div>
    );
  }

};

export default LoginPage;
