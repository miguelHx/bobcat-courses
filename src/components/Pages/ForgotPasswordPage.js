import React from 'react';
import ForgotPasswordForm from "../Forms/ForgotPasswordForm";

const ForgotPasswordPage = (props) => {
  return (
    <div className="forgot-password-page__main-container"> {/* note: styles for most pages are in index.css */}
      <h1 className="center-text">Forgot Password</h1>
      <ForgotPasswordForm />
    </div>
  );
};


export default ForgotPasswordPage;