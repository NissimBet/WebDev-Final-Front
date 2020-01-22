import React from 'react';
import Head from 'next/head';

import { Box } from '@material-ui/core';

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>home</title>
      </Head>
      <p>hello</p>
      <Box>
        <p>hi</p>
      </Box>
    </React.Fragment>
  );
};

export default Index;
