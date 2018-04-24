import React from 'react';

const SignUpPage = (props) => {
  if (props.isLoggedIn) {
    props.history.replace('/');
    return null;
  }
  return (
    <div className="main-container">
      This is the SIGN UP Page
    </div>
  );
};

export default SignUpPage;
