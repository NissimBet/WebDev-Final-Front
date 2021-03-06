import { SkipNavContent } from '@reach/skip-nav';
import '@reach/skip-nav/styles.css';
import Head from 'next/head';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Paper, makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100vh;
  }
  [data-reach-skip-link] {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
  [data-reach-skip-link]:focus {
    padding: 1rem;
    position: fixed;
    top: 10px;
    left: 10px;
    background: white;
    z-index: 1;
    width: auto;
    height: auto;
    clip: auto;
  }
`;

interface AppLayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const AppLayout: React.FunctionComponent<AppLayoutProps> = ({
  children,
  isLoggedIn,
}) => {
  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <title>// TODO: Title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <GlobalStyle />

      <Navbar isLoggedIn={isLoggedIn} />
      <CommonLayout children={children} />
      <Footer />
    </React.Fragment>
  );
};

const useStyle = makeStyles(theme => ({
  root: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: theme.spacing(3),
    minHeight: '80vh',
  },
}));

const CommonLayout: React.FunctionComponent<any> = ({ children }) => {
  const classes = useStyle({});
  return (
    <>
      <Paper className={classes.root}>
        <SkipNavContent />

        {children}
      </Paper>
    </>
  );
};

export default AppLayout;
