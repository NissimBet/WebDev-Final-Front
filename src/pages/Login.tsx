import React from 'react';
import Head from 'next/head';

import LoginPage from '../components/Login/LoginPage';

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </React.Fragment>
  );
};
