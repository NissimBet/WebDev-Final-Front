import cookies from 'next-cookies';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import nextCookie from 'next-cookies';
import AppLayout from '../components/AppLayout';
import withApolloClient from '../../lib/with-apollo-client';

function checkUserAuth(ctx) {
  const { token } = nextCookie(ctx);

  if (process.env.NODE_ENV === 'development') {
    return;
  }

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

const MyApp = props => {
  const { Component, apolloClient, isLoggedIn } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <AppLayout isLoggedIn={isLoggedIn}>
        <Component apolloClient={apolloClient} />
      </AppLayout>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async initialProps => {
  const { Component, ctx } = initialProps;
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const { token } = cookies(ctx);

  const isLoggedIn = !!token;

  checkUserAuth(ctx);

  return { pageProps, isLoggedIn };
};

export default withApolloClient(MyApp);
