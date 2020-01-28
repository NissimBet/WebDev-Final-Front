import cookies from 'next-cookies';
import React from 'react';

import nextCookie from 'next-cookies';
import AppLayout from '../components/AppLayout';

import NextApp from 'next/app';

import theme from './../utils/theme';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

function checkUserAuth(ctx) {
  const { token } = nextCookie(ctx);

  /* if (process.env.NODE_ENV === 'development') {
    return;
  } */

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req) {
    if (!token && ctx.pathname !== '/login') {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
      return;
    }

    if (token && ctx.pathname === '/login') {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
      return;
    }
  }
}
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

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const { token } = cookies(ctx);

  const isLoggedIn = !!token;

  //checkUserAuth(ctx);

  return { pageProps, isLoggedIn };
};

export default MyApp;
