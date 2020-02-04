import React from 'react';
import Head from 'next/head';
import League from '../../components/Games/League';

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>League of Legends</title>
      </Head>
      <League />
    </React.Fragment>
  );
};
