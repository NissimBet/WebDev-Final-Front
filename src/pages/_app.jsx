import cookies from 'next-cookies';
import React from 'react';

import AppLayout from '../components/AppLayout';

import NextApp from 'next/app';

import theme from './../utils/theme';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

class MyApp extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, apolloClient, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <AppLayout isLoggedIn={isLoggedIn}>
            <Component apolloClient={apolloClient} />
          </AppLayout>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

MyApp.getInitialProps = async initialProps => {
  const { Component, ctx } = initialProps;
  let pageProps = {};
  const { token } = cookies(ctx);
  const isLoggedIn = !!token;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, isLoggedIn };
};

export default MyApp;
