import { SkipNavContent, SkipNavLink } from '@reach/skip-nav';
import '@reach/skip-nav/styles.css';
import Head from 'next/head';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { useRouter } from 'next/router';
import { Box } from '@material-ui/core';
import Navbar from './Navbar';

//import { UserSession } from '../types/temporal';
// import { getCurrentUser } from '../hooks';

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

const AppLayout: React.FunctionComponent<AppLayoutProps> = ({ children }) => {
  //const router = useRouter();

  //const isLoginPage = router?.route.includes('/login') ?? true;
  const isLoginPage = false;

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
      <Navbar />
      <CommonLayout children={children} />
    </React.Fragment>
  );
};

const CommonLayout: React.FunctionComponent<any> = ({ children }) => {
  return (
    <>
      <Box marginTop={3} maxWidth={1200} marginX="auto" paddingX={3}>
        <SkipNavContent />
        {children}
      </Box>
    </>
  );
};
/* 
const LoginLayout: React.FunctionComponent<any> = ({ children }) => {
  return (
    <>
      <Box mx="auto">
        <SkipNavContent />
        {children}
      </Box>
    </>
  );
};
 */
export default AppLayout;
