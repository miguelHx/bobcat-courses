import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        username: null
      }
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/');
      }
      else {
        try {
          const username = Auth.getUsername();
          this.setState({ username: username });
        }
        catch (err) {
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    render() {
      const { username } = this.state;
      if (username) {
        return (
          <AuthComponent history={this.props.history} username={username} />
        );
      }
      else {
        return <div>Please login to view schedules. <Link to="/login">(Login)</Link></div>
      }
    }

  }
}
