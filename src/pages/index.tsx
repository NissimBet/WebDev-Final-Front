import React from 'react';
import Head from 'next/head';

import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const matStyles = makeStyles({
  root: {
    color: 'blue',
  },
});

const Index = () => {
  const styles = matStyles({});

  return (
    <React.Fragment>
      <Head>
        <title>Your Game Monitor</title>
      </Head>
    </React.Fragment>
  );
};

export default Index;
