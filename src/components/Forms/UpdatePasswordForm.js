import React from 'react';
import {Button, Form, Message} from "semantic-ui-react";
import BobcatCoursesApi from '../../api/BobcatCoursesApi';
import AuthService from '../../login/AuthService';
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from "../../utils/ToastOptions";
import { withSizes } from 'react-sizes';

class UpdatePasswordForm extends React.Component {

  state = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    error: '',
  };

  updateUserPassword = (postData) => {
    BobcatCoursesApi.updateUserPassword(postData, AuthService.getToken())
      .then(res => {
        if (res['success']) {
          toast.success("Password Changed Successfully 🤗", TOAST_OPTIONS);
          this.setState({ oldPassword: '', newPassword: '', confirmNewPassword: '', error: '' });
        }
        else if (res['fail'] === "password_incorrect") {
          this.setState({ oldPassword: '', newPassword: '', confirmPassword: '', error: 'Old Password Incorrect' });
        }
        else if (res['fail']) {
          this.setState({ oldPassword: '', newPassword: '', confirmPassword: '', error: res['fail'] });
        }
        else {
          this.setState({ oldPassword: '', newPassword: '', confirmPassword: '', error: 'An error has occurred.' });
        }
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
      })
  };

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value, error: '' }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { newPassword, confirmNewPassword } = this.state;

    // form validation
    if (newPassword.length < 7 || confirmNewPassword.length < 7) {
      this.setState({ error: 'New Password must be at least 7 characters. Please try again' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      this.setState({ error: 'New passwords do not match. Please try again.' });
      return;
    }

    // once we pass the checks, submit form to server.
    const { oldPassword } = this.state;

    let postData = JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    });

    this.updateUserPassword(postData);
  };

  render() {
    const { oldPassword, newPassword, confirmNewPassword, error } = this.state;
    const { isMobile } = this.props;
    return (
      <div className='update-password-form'>
        <Message
          attached
          header='Change Your Password'
          content='Fill out the form below to change your password.'
          warning
        />
        <Form
          className='attached fluid segment'
          onSubmit={this.handleSubmit}
          size={isMobile ? 'big' : 'large'}
        >
          {
            error &&  <Message size='small' negative>
              {error}
            </Message>
          }
          <Form.Field required>
            <label>Old Password</label>
            <input
              name="oldPassword"
              type="password"
              value={oldPassword}
              onChange={this.handleUserInput}
              required
            />
          </Form.Field>
          <Form.Field required>
            <label>New Password</label>
            <input
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={this.handleUserInput}
              required
            />
          </Form.Field>
          <Form.Field required>
            <label>Confirm Password</label>
            <input
              name="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={this.handleUserInput}
              required
            />
          </Form.Field>
          <Button type="submit" color='yellow' size={isMobile ? 'big' : 'large'}>Change Password</Button>
        </Form>
      </div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
});

export default withSizes(mapSizesToProps)(UpdatePasswordForm);