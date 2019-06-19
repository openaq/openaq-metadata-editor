import React from 'react';

import Header from '../components/header';

class Login extends React.Component {
  render () {
    return (
      <div className='page page--login'>
        <Header />
        <main role='main'>
          <div className='inner'>
            <div className='login-message'>
              Please log in to access this page.
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
