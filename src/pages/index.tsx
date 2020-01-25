import React from 'react';
import Head from 'next/head';
import { HomePageSearchForm, HomePageChampionPool } from '../components/Home';

import { makeStyles, Box, Typography } from '@material-ui/core';

const matStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
}));

const Index = () => {
  const styles = matStyles({});

  return (
    <React.Fragment>
      <Head>
        <title>Your Game Monitor</title>
      </Head>

      <Box>
        {/* Title */}
        <Typography className={styles.title} variant="h3">
          Welcome
        </Typography>
        {/* Champion Search */}
        <HomePageSearchForm />
        {/* Recent Builds */}
        <div style={{ height: '30px' }}></div>

        <HomePageChampionPool />
        {/* Recent Patch Notes */}
      </Box>
    </React.Fragment>
  );
};

export default Index;
