import React from 'react';
import Head from 'next/head';
import Register from '../components/Register';

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>Register</title>
      </Head>
      <Register />
    </React.Fragment>
  );
};
