import React from 'react';
import AboutUsPage from '../components/AboutUs';
import Head from 'next/head';

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>About Us</title>
      </Head>
      <AboutUsPage />
    </React.Fragment>
  );
};
