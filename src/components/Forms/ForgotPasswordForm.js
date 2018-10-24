import React from "react";
import {Button, Form, Message} from "semantic-ui-react";
import {withSizes} from "react-sizes";
import { toast } from 'react-toastify';
import BobcatCoursesApi from "../../api/BobcatCoursesApi";
import { TOAST_OPTIONS } from "../../utils/ToastOptions";

class ForgotPasswordForm extends React.Component {

  state = {
    username: '',
    error: '',
  };

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: undefined });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username } = this.state;
    const data = JSON.stringify({ username });
    BobcatCoursesApi.forgotPassword(data)
      .then((response) => {
        console.log(response);
        if (response['success']) {
          toast.success("Please check your email for password reset steps 😇", TOAST_OPTIONS);
        }
        else if (response['error_code'] === 109) {
          this.setState({ error: response['error_description'] });
        }
      })
      .catch((error) => {
        this.setState({ error: 'An Unknown Error has occurred.' });
      })
  };

  render() {
    const { username, error } = this.state;
    const { isMobile } = this.props;
    return (
      <div className="login-form">
        <Message
          header='No worries'
          content='Fill out the form below and we will send you an email to reset your password'
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
          <Button type="submit" color="blue" size={isMobile ? 'big' : 'large'}>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
});

export default withSizes(mapSizesToProps)(ForgotPasswordForm);
