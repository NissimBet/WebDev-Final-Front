import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Head from 'next/head';
import Dota from '../../components/Games/Dota';

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>Dota 2</title>
      </Head>
      <Dota />
    </React.Fragment>
  );
};
