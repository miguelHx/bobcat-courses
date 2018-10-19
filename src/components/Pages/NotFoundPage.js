import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const NotFoundPage = () => {
  return (
    <div className="login-signup-page__main-container">
      <h1 style={{textAlign: 'center'}}>404 Page Not Found.</h1>
      <p style={{textAlign: 'center', marginTop: '25px', marginBottom: '25px'}}>Check the URL</p>
      <Link style={{display: 'flex'}} to="/">
        <Button style={{marginLeft: 'auto', marginRight: 'auto'}} color='teal'>Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
