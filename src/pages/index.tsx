import React from 'react';
import Head from 'next/head';

import styled from 'styled-components';
import { Box, Button, makeStyles } from '@material-ui/core';

const Title = styled('p')(({ theme }) => ({
  color: 'red',
}));

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
        <title>home</title>
      </Head>
      <p>hello</p>
      <Box>
        <p>hi</p>
        <Title>Red</Title>
        <Button className={styles.root}>Click me</Button>
      </Box>
    </React.Fragment>
  );
};

export default Index;
