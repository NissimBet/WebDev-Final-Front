import React from 'react';
import Head from 'next/head';
import ContactUs from '../components/ContactUs';

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>Contact Us</title>
      </Head>
      <ContactUs />
    </React.Fragment>
  );
};
